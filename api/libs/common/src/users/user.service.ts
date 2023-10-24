import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/users/user.entity';
import { Repository } from 'typeorm';
import {
  NewUserDto,
  UserOAuthCredentialsDto,
} from '@app/common/users/user.dto';
import { ConfigService } from '@nestjs/config';
import MicroServiceResponse from '@app/common/micro.service.response';
import { AES, MD5 } from 'crypto-js';
import { JwtService } from '@nestjs/jwt';
import { OauthService } from '@app/common/OAuth/oauth.service';

export enum UserRelations {
  APPLETS = 'applets',
}

export const OAuthServices = {
  google: 'google_token',
  facebook: 'facebook_token',
  github: 'github_token',
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly oauthService: OauthService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  /**
   * Create a new user
   * @param data NewUser object
   * @returns UserEntity object
   */
  async create(data: NewUserDto): Promise<MicroServiceResponse> {
    if (await this.exists({ email: data.email }))
      return new MicroServiceResponse({
        code: HttpStatus.CONFLICT,
        message: 'User already exists',
      });

    const hashedPassword: string = MD5(data.password).toString();
    const user = await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });
    const response = { ...user };
    delete response.password;

    const payload = { id: user.id, email: data.email };
    return new MicroServiceResponse({
      data: { ...response, access_token: this.jwtService.sign(payload) },
    });
  }

  /**
   * Create a new user with OAuth credentials
   * @param data NewUserOAuth object
   * @returns Promise<MicroServiceResponse> object
   */
  async createOAuth(
    data: UserOAuthCredentialsDto,
  ): Promise<MicroServiceResponse> {
    if (OAuthServices[data.provider] == undefined)
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'Invalid OAuth provider',
      });

    const encryptedToken: string = AES.encrypt(
      data.token,
      this.configService.get('AES_SECRET'),
    ).toString();
    const hashedId: string = MD5(data.id).toString();

    const user = await this.userRepository.save({
      name: '',
      email: data.email,
      password: null,
    });

    const oauth = await this.oauthService.create({
      user,
      provider: data.provider,
      providerId: hashedId,
      email: data.email,
      token: encryptedToken,
    });

    const response = { ...user };
    delete response.password;

    const payload = { id: user.id, email: data.email };
    return new MicroServiceResponse({
      data: { ...response, access_token: this.jwtService.sign(payload) },
      code: HttpStatus.CREATED,
      message: 'Account created',
    });
  }

  /**
   * Find a user by id
   * @param query Query object
   * @returns UserEntity
   */
  findOne(query: any): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: query,
      relations: [UserRelations.APPLETS],
    });
  }

  /**
   * Find if a user exists
   * @param query Query object
   * @returns boolean true if user exists
   */
  async exists(query: any): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: query,
    });
    return !!user;
  }
}
