import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AES, MD5 } from 'crypto-js';
import {
  AlreadyExistError,
  OauthEntity,
  OAuthRelations,
  OauthService,
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

    let oauth = await this.oauthService.findOne(
      {
        providerId: hashedId,
        provider: data.provider,
      },
      [OAuthRelations.USER],
    );

    if (oauth && oauth.email !== data.email) {
      throw new UnauthorizeError();
    }

    let user;

    if (!oauth) {
      oauth = await this.oauthService.create({
        accessToken: null,
        providerId: hashedId,
        email: data.email,
        provider: data.provider,
        refreshToken: hashedRefreshToken,
        user: null,
      });
      user = null;
    } else {
      user = oauth.user;
    }

    if (oauth && !user) {
      user = await this.userService.create({
        email: data.email,
        name: data.name || data.email,
        password: null,
      });
      await this.oauthService.update(oauth.id, {
        user: user,
      });
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

    const oauth = await this.oauthService.findOne(
      {
        providerId: MD5(data.providerId).toString(),
        provider: data.provider,
        user: user,
      },
      [OAuthRelations.USER],
    );
    if (oauth) {
      throw new AlreadyExistError();
    }

    return this.oauthService.create({
      accessToken: null,
      providerId: MD5(data.providerId).toString(),
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
}
