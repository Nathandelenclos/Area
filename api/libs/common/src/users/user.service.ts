import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/users/user.entity';
import { Repository } from 'typeorm';
import { NewUserDto, NewUserOAuthDto } from '@app/common/users/user.dto';
import { ConfigService } from '@nestjs/config';
import MicroServiceResponse from '@app/common/micro.service.response';

export enum UserRelations {
  APPLETS = 'applets',
}

const OAuthServices = {
  google: 'google_token',
  facebook: 'facebook_token',
  github: 'github_token',
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Create a new user
   * @param data NewUser object
   * @returns UserEntity object
   */
  async create(data: NewUserDto) {
    if (await this.exists({ email: data.email }))
      return new MicroServiceResponse({
        code: HttpStatus.CONFLICT,
        message: 'User already exists',
      });

    const salt: number = +this.configService.get('BCRYPT_SALT');
    const hashedPassword: string = data.password; // await hash(data.password, salt);
    const user = await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });
    const response = { ...user };
    delete response.password;
    return new MicroServiceResponse({
      data: response,
    });
  }

  /**
   * Create a new user with OAuth credentials
   * @param data NewUserOAuth object
   * @returns Promise<MicroServiceResponse> object
   */
  async createOAuth(data: NewUserOAuthDto): Promise<MicroServiceResponse> {
    if (
      data.email == null ||
      data.provider == null ||
      data.token == null ||
      data.name == null
    )
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'Missing parameters',
      });

    if (OAuthServices[data.provider] == undefined)
      return new MicroServiceResponse({
        code: HttpStatus.BAD_REQUEST,
        message: 'Invalid OAuth provider',
      });

    if (await this.exists({ email: data.email }))
      return new MicroServiceResponse({
        code: HttpStatus.CONFLICT,
        message: 'User already exists',
      });

    const cryptToken: string = data.token;
    delete data.token;

    const user = await this.userRepository.save({
      name: data.name,
      email: data.email,
      password: null,
      [OAuthServices[data.provider]]: cryptToken,
    });

    const response = { ...user };
    delete response.google_token;
    delete response.facebook_token;
    delete response.github_token;
    delete response.password;
    return new MicroServiceResponse({
      data: response,
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
