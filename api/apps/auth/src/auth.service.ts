import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuthServices, UserService } from '@app/common/users/user.service';
import MicroServiceResponse from '@app/common/micro.service.response';
import {
  AppletRelations,
  AppletService,
} from '@app/common/applets/applet.service';
import {
  NewUserDto,
  NewUserOAuthDto,
  UserCredentialsDto,
  UserOAuthCredentialsDto,
} from '@app/common/users/user.dto';
import { AES, MD5, enc } from 'crypto-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly appletService: AppletService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Register a new user
   * @param data NewUser
   * @returns Promise<MicroServiceResponse> object
   */
  async register(data: NewUserDto): Promise<MicroServiceResponse> {
    if (data.name == null || data.email == null || data.password == null) {
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'Missing parameters',
      });
    }

    return await this.userService.create(data);
  }

  /**
   * Register a new user with OAuth
   * @param data NewUserOAuth
   * @returns Promise<MicroServiceResponse> object
   */
  async oAuth(data: NewUserOAuthDto): Promise<MicroServiceResponse> {
    if (
      data.name == null ||
      data.email == null ||
      data.provider == null ||
      data.token == null
    ) {
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'Missing parameters',
      });
    }

    return await this.userService.createOAuth(data);
  }

  /**
   * Sign in a user with credentials and return a JWT
   * @param data UserCredentials
   * @returns Promise<MicroServiceResponse> object
   */
  async signIn(data: UserCredentialsDto): Promise<MicroServiceResponse> {
    const user = await this.userService.findOne({ email: data.email });
    if (!user) {
      return new MicroServiceResponse({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
    const isMatch = MD5(data.password).toString() == user.password;
    if (!isMatch) {
      return new MicroServiceResponse({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const payload = { id: user.id, email: user.email };
    return new MicroServiceResponse({
      data: { access_token: this.jwtService.sign(payload) },
    });
  }

  async signOAuth(
    data: UserOAuthCredentialsDto,
  ): Promise<MicroServiceResponse> {
    if (data.email == null || data.provider == null || data.token == null)
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'Missing parameters',
      });

    const user = await this.userService.findOne({ email: data.email });
    if (!user) {
      return new MicroServiceResponse({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    if (OAuthServices[data.provider] == undefined)
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'Invalid OAuth provider',
      });

    if (!user[OAuthServices[data.provider]])
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'No OAuth provider linked to this email',
      });

    const bytes = AES.decrypt(
      user[OAuthServices[data.provider]],
      this.configService.get('AES_SECRET'),
    );
    const isMatch = bytes.toString(enc.Utf8) == data.token;
    if (!isMatch) {
      return new MicroServiceResponse({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const payload = { id: user.id, email: data.email };
    return new MicroServiceResponse({
      data: { access_token: this.jwtService.sign(payload) },
    });
  }

  /**
   * Return all the information linked to the user
   * @param data UserEntity
   * @returns Promise<MicroServiceResponse> object
   */
  async me(data: any): Promise<MicroServiceResponse> {
    return new MicroServiceResponse({
      data: await this.appletService.findAll(
        {
          user: { id: data.id },
        },
        [AppletRelations.REACTIONS, AppletRelations.ACTION],
      ),
    });
  }
}
