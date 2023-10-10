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
    if (
      data.name == null ||
      data.email == null ||
      data.password == null ||
      data.password.length == 0 ||
      data.email.length == 0 ||
      data.name.length == 0
    ) {
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'Missing parameters',
      });
    }

    return await this.userService.create(data);
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
      data: {
        email: user.email,
        name: user.name,
        access_token: this.jwtService.sign(payload),
      },
    });
  }

  async signOAuth(
    data: UserOAuthCredentialsDto,
  ): Promise<MicroServiceResponse> {
    if (
      data.email == null ||
      data.provider == null ||
      data.token == null ||
      data.id == null
    )
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'Missing parameters',
      });

    const hashedId: string = MD5(data.id).toString();
    const userByEmail = await this.userService.findOne({
      email: data.email,
    });
    const userById = await this.userService.findOne({
      provider_id: hashedId,
    });
    if (!userByEmail && !userById)
      return await this.userService.createOAuth(data);
    if ((userByEmail && !userById) || (!userByEmail && userById))
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'Invalid Credentials',
      });

    const user = userByEmail ? userByEmail : userById;

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

    const isMatch = user.provider_id == hashedId;
    if (!isMatch) {
      return new MicroServiceResponse({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const payload = { id: user.id, email: data.email };
    return new MicroServiceResponse({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        access_token: this.jwtService.sign(payload),
      },
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
