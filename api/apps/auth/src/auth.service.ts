import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AES, MD5, enc } from 'crypto-js';
import {
  OAuthRelations,
  OauthService,
  UnAuthorizeError,
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
      throw new UnAuthorizeError();
    }
    const isMatch = MD5(data.password).toString() == user.password;
    if (!isMatch) {
      throw new UnAuthorizeError();
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

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

    if (
      !oauth ||
      (oauth &&
        AES.decrypt(
          oauth.refreshToken,
          this.configService.get('AES_SECRET'),
        ).toString(enc.Utf8) != data.refreshToken)
    ) {
      throw new UnAuthorizeError();
    }

    let user = await this.userService.findOne({ id: oauth?.user.id });
    if (!oauth) {
      oauth = await this.oauthService.create({
        accessToken: null,
        providerId: hashedId,
        email: data.email,
        provider: data.provider,
        refreshToken: hashedRefreshToken,
        user: user,
      });
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
      [
        UserRelations.APPLETS,
        UserRelations.APPLETS_ACTION,
        UserRelations.APPLETS_REACTION,
        UserRelations.OAUTH,
      ],
    );
    delete user.password;
    return user;
  }
}
