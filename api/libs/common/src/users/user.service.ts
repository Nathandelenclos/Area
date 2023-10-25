import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/users/user.entity';
import { Repository } from 'typeorm';
import { MD5 } from 'crypto-js';
import { AlreadyExistError, ValidationError } from '@app/common/errors';
import { UserNativeCredentialsDto } from '@app/common/users/user.dto';

export enum UserRelations {
  APPLETS = 'applets',
  APPLETS_ACTION = 'applets.action',
  APPLETS_REACTION = 'applets.reaction',
  APPLETS_CONFIG = 'applets.config',
  OAUTH = 'oauth',
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
  ) {}

  /**
   * Create a new user
   * @param data NewUser object
   * @returns UserEntity object
   */
  async create(data: UserNativeCredentialsDto): Promise<UserEntity> {
    if (await this.exists({ email: data.email }))
      throw new AlreadyExistError('User already exists');

    let hashedPassword = null;
    if (data.password != null) {
      if (data.password.length < 8)
        throw new ValidationError<keyof UserNativeCredentialsDto>(['password']);
      hashedPassword = MD5(data.password).toString();
    }

    return this.userRepository.save({
      ...data,
      password: hashedPassword,
    });
  }

  /**
   * Find a user by id
   * @param query Query object
   * @param relations
   * @returns UserEntity
   */
  findOne(
    query: Partial<UserEntity>,
    relations?: UserRelations[],
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: query,
      relations: relations || [],
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

  async update(id: number, data: Partial<UserEntity>): Promise<void> {
    await this.userRepository.update(id, data);
  }
}
