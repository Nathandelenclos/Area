import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AES, MD5 } from 'crypto-js';
import {
  AlreadyExistError,
  OauthEntity,
  OAuthRelations,
  OauthService,
  Providers,
  UnauthorizeError,
  UserEntity,
  UserLoggedInDto,
  UserNativeCredentialsDto,
  UserOAuthCredentialsDto,
  UserRelations,
  UserService,
  ValidationError,
} from '@app/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly oauthService: OauthService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * @param data NewUser
   * @returns Promise<MicroServiceResponse> object
   */
  async register(data: UserNativeCredentialsDto): Promise<UserLoggedInDto> {
    if (data.name == null || data.email == null || data.password == null) {
      throw new ValidationError<keyof UserNativeCredentialsDto>([
        'password',
        'email',
        'name',
      ]);
    }

    const user = await this.userService.create(data);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

  /**
   * Sign in a user with credentials and return a JWT
   * @param data UserCredentials
   * @returns Promise<MicroServiceResponse> object
   */
  async signIn(data: UserNativeCredentialsDto): Promise<UserLoggedInDto> {
    if (!data.email || !data.password) {
      throw new ValidationError<keyof UserNativeCredentialsDto>([
        'password',
        'email',
      ]);
    }
    const user = await this.userService.findOne({ email: data.email });
    if (!user) {
      throw new UnauthorizeError();
    }
    const isMatch = MD5(data.password).toString() == user.password;
    if (!isMatch) {
      throw new UnauthorizeError();
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

  /**
   * Sign in a user with OAuth credentials and return a JWT
   * @param data
   */
  async signOAuth(data: UserOAuthCredentialsDto): Promise<UserLoggedInDto> {
    if (data.provider === 'spotify' && data.code) {
      const result = await this.spotifyAuth({
        code: data.code,
      });
      data = {
        ...data,
        ...result,
      };
    }

    if (data.provider === 'github' && data.code) {
      const result = await this.githubAuth({
        code: data.code,
      });
      data = {
        ...data,
        ...result,
      };
    }
    console.log(data);

    if (!data.email || !data.provider || !data.refreshToken || !data.providerId)
      throw new ValidationError<keyof UserOAuthCredentialsDto>([
        'email',
        'provider',
        'refreshToken',
        'providerId',
      ]);

    const hashedId: string = MD5(data.providerId).toString();
    const hashedRefreshToken: string = AES.encrypt(
      data.refreshToken,
      this.configService.get('AES_SECRET'),
    ).toString();

    const oauth = await this.oauthService.findOne(
      {
        providerId: hashedId,
        provider: data.provider,
        email: data.email,
      },
      [OAuthRelations.USER],
    );

    let user;
    if (!oauth) {
      user = await this.userService.create({
        email: data.email,
        name: data.name || data.email,
        password: null,
      });
      await this.oauthService.create({
        accessToken: null,
        providerId: hashedId,
        email: data.email,
        provider: data.provider,
        refreshToken: hashedRefreshToken,
        user: user,
      });
    } else {
      user = oauth.user;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }

  /**
   * Return all the information linked to the user
   * @param data UserEntity
   * @returns Promise<MicroServiceResponse> object
   */
  async me(data: any): Promise<Partial<UserEntity>> {
    const user = await this.userService.findOne(
      {
        id: data.id,
        email: data.email,
      },
      [UserRelations.OAUTH],
    );
    delete user.password;
    return user;
  }

  /**
   * Recover a password
   * @param data
   */
  async recoverPassword(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /**
   * Reset a password
   * @param data
   */
  async resetPassword(data: UserNativeCredentialsDto): Promise<void> {
    if (!data.id || !data.email || !data.password) {
      throw new ValidationError<keyof UserNativeCredentialsDto>([
        'id',
        'password',
        'email',
      ]);
    }
    if (data.password.length < 8)
      throw new ValidationError<keyof UserNativeCredentialsDto>(['password']);
    const user = this.userService.findOne({ id: data.id, email: data.email });
    if (!user) {
      throw new UnauthorizeError();
    }

    await this.userService.update(data.id, {
      password: MD5(data.password).toString(),
    });
  }

  /**
   * Link an OAuth account to a user
   * @param data
   */
  async connectOAuth(data: UserOAuthCredentialsDto): Promise<OauthEntity> {
    if (
      !data.id ||
      !data.email ||
      !data.provider ||
      !data.refreshToken ||
      !data.providerId
    )
      throw new ValidationError<keyof UserOAuthCredentialsDto>([
        'id',
        'email',
        'provider',
        'refreshToken',
        'providerId',
      ]);
    const user = await this.userService.findOne({ id: data.id });
    const hashed = MD5(data.providerId).toString();
    const oauth = await this.oauthService.findOne(
      {
        providerId: hashed,
        provider: data.provider,
      },
      [OAuthRelations.USER],
    );

    if (oauth) {
      throw new AlreadyExistError();
    }

    return this.oauthService.create({
      accessToken: null,
      providerId: hashed,
      email: data.email,
      provider: data.provider,
      refreshToken: AES.encrypt(
        data.refreshToken,
        this.configService.get('AES_SECRET'),
      ).toString(),
      user: user,
    });
  }

  /**
   * Unlink an OAuth account from a user
   * @param id
   * @param user
   */
  async deleteOAuth(
    id: number,
    user: { id: number; email: string },
  ): Promise<void> {
    const oauth = await this.oauthService.findOne(
      {
        id: id,
      },
      [OAuthRelations.USER],
    );
    if (!oauth || oauth.user.id !== user.id) {
      throw new UnauthorizeError();
    }
    await this.oauthService.delete(id);
  }

  /**
   * Delete a user account
   * @param id
   * @param user
   */
  async deleteAccount(id, email) {
    const userEntity = await this.userService.findOne({
      id: id,
      email: email,
    });
    if (!userEntity) {
      throw new UnauthorizeError();
    }
    await this.userService.delete(userEntity.id);
  }

  async spotifyAuth({ code }) {
    const client_id = this.configService.get('SPOTIFY_CLIENT_ID');
    const client_secret = this.configService.get('SPOTIFY_CLIENT_SECRET');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.configService.get('SPOTIFY_REDIRECT_URI'),
      }),
    });

    const result = await response.json();
    console.log('result', result);

    const spotifyMe = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${result.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    console.log('result', spotifyMe);
    return {
      providerId: spotifyMe.id,
      email: spotifyMe.email,
    };
  }

  async githubAuth({ code }) {
    const client_id = this.configService.get('GITHUB_CLIENT_ID');
    const client_secret = this.configService.get('GITHUB_CLIENT_SECRET');
    console.log('code', code);
    console.log('client_id', client_id);
    console.log('client_secret', client_secret);
    console.log(
      "this.configService.get('GITHUB_REDIRECT_URI')",
      this.configService.get('GITHUB_REDIRECT_URI'),
    );
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.configService.get('GITHUB_REDIRECT_URI'),
      }),
    }).then((res) => res.json());

    console.log('result', result);
    const response = await fetch('https://api.github.com/user/emails', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${result.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    console.log('result', response);
    return {
      email: response[0].email,
      providerId: response[1].email,
    };
  }
}
