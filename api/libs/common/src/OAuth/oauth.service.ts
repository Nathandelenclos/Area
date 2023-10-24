import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OauthEntity } from '@app/common/OAuth/oauth.entity';
import { OauthDto } from '@app/common/OAuth/oauth.dto';

@Injectable()
export class OauthService {
  constructor(private readonly oauthRepository: Repository<OauthEntity>) {}

  /**
   * Find one oauth by email
   * @param email - email of the oauth
   */
  async findOneByEmail(email: string): Promise<OauthEntity> {
    return this.oauthRepository.findOne({ where: { email } });
  }

  /**
   * Find one oauth by token
   * @param token - token of the oauth
   */
  async findOneByToken(token: string): Promise<OauthEntity> {
    return this.oauthRepository.findOne({ where: { token } });
  }

  /**
   * Create a new oauth
   * @param data - OauthDto
   */
  async create(data: OauthDto): Promise<OauthEntity> {
    return this.oauthRepository.save(data);
  }

  /**
   * Update an oauth
   * @param id - id of the oauth
   * @param data - Partial<OauthDto>
   */
  async update(id: number, data: Partial<OauthDto>): Promise<OauthEntity> {
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
  async exists(data: Partial<OauthDto>): Promise<boolean> {
    return (
      (await this.oauthRepository.count({
        where: data,
      })) > 0
    );
  }

  /**
   * Find all oauths
   */
  async findAll(): Promise<OauthEntity[]> {
    return this.oauthRepository.find();
  }

  /**
   * Find one oauth
   * @param query - Query object
   */
  async findOne(query: any): Promise<OauthEntity | undefined> {
    return this.oauthRepository.findOne({
      where: query,
    });
  }

  /**
   * Find many oauths
   * @param query - Query object
   */
  async find(query: any): Promise<OauthEntity[] | undefined> {
    return this.oauthRepository.find({
      where: query,
    });
  }
}
