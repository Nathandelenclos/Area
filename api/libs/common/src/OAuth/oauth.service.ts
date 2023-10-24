import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OauthEntity } from '@app/common/OAuth/oauth.entity';
import { UserOAuthCredentialsDto } from '@app/common/OAuth/oauth.dto';
import { InjectRepository } from '@nestjs/typeorm';

export enum OAuthRelations {
  USER = 'user',
}

@Injectable()
export class OauthService {
  constructor(
    @InjectRepository(OauthEntity)
    private readonly oauthRepository: Repository<OauthEntity>,
  ) {}

  /**
   * Find one oauth by email
   * @param email - email of the oauth
   * @param relations
   */
  async findOneByEmail(
    email: string,
    relations?: OAuthRelations[],
  ): Promise<OauthEntity> {
    return this.oauthRepository.findOne({
      where: { email },
      relations: relations || [],
    });
  }

  /**
   * Find one oauth by token
   * @param refreshToken
   * @param relations
   */
  async findOneByToken(
    refreshToken: string,
    relations?: OAuthRelations[],
  ): Promise<OauthEntity> {
    return this.oauthRepository.findOne({
      where: { refreshToken },
      relations: relations || [],
    });
  }

  /**
   * Create a new oauth
   * @param data - OauthDto
   */
  async create(data: UserOAuthCredentialsDto): Promise<OauthEntity> {
    return this.oauthRepository.save(data);
  }

  /**
   * Update an oauth
   * @param id - id of the oauth
   * @param data - Partial<OauthDto>
   */
  async update(id: number, data: Partial<OauthEntity>): Promise<OauthEntity> {
    await this.oauthRepository.update(id, data);
    return this.oauthRepository.findOne({
      where: { id },
    });
  }

  /**
   * Delete an oauth
   * @param id - id of the oauth
   */
  async delete(id: number): Promise<OauthEntity> {
    const oauth = await this.oauthRepository.findOne({
      where: { id },
    });
    await this.oauthRepository.delete(id);
    return oauth;
  }

  /**
   * Check if an oauth exists
   * @param data - Partial<OauthDto>
   */
  async exists(data: Partial<OauthEntity>): Promise<boolean> {
    return (
      (await this.oauthRepository.count({
        where: data,
      })) > 0
    );
  }

  /**
   * Find all oauths
   * @param relations
   */
  async findAll(relations?: OAuthRelations[]): Promise<OauthEntity[]> {
    return this.oauthRepository.find({ relations: relations || [] });
  }

  /**
   * Find one oauth
   * @param query - Query object
   * @param relations
   */
  async findOne(
    query: Partial<OauthEntity>,
    relations?: OAuthRelations[],
  ): Promise<OauthEntity | undefined> {
    return this.oauthRepository.findOne({
      where: query,
      relations: relations || [],
    });
  }

  /**
   * Find many oauths
   * @param query - Query object
   * @param relations
   */
  async find(
    query: Partial<OauthEntity>,
    relations?: OAuthRelations[],
  ): Promise<OauthEntity[] | undefined> {
    return this.oauthRepository.find({
      where: query,
      relations: relations || [],
    });
  }
}
