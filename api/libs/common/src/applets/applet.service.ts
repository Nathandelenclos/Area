import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppletEntity } from './applet.entity';
import { AppletConfigService } from './configuration/applet.config.service';
import { AppletDto } from './applet.dto';

export enum AppletRelations {
  USER = 'user',
  ACTIONS = 'actions.action',
  REACTIONS = 'reactions.reaction',
  ACTIONS_CONFIG = 'actions.configs',
  REACTION_CONFIG = 'reactions.configs',
}

@Injectable()
export class AppletService {
  constructor(
    @InjectRepository(AppletEntity)
    private readonly appletRepository: Repository<AppletEntity>,
    private readonly appletConfigService: AppletConfigService,
  ) {}

  /**
   * Create a new applet and its configuration
   * @param data Applet data
   * @returns Applet
   */
  async create(data: AppletDto): Promise<AppletEntity> {
    return this.appletRepository.save(data);
  }

  /**
   * Find an applet by its id
   * @param options
   * @param relations Include relations
   */
  findOne(
    options: Partial<AppletEntity>,
    relations: AppletRelations[] = [],
  ): Promise<AppletEntity> {
    return this.appletRepository.findOne({
      where: options,
      relations: relations,
    });
  }

  /**
   * Find all applets
   * @param options
   * @param relations Include relations
   */
  findAll(relations?: AppletRelations[]): Promise<AppletEntity[]> {
    return this.appletRepository.find({
      relations: relations,
    });
  }

  /**
   * Find all applets by user id
   * @param userId User id
   * @param relations Include relations
   */
  findAllByUserId(
    userId: number,
    relations?: AppletRelations[],
  ): Promise<AppletEntity[]> {
    return this.appletRepository.find({
      where: { user: { id: userId } },
      relations: relations,
    });
  }

  /**
   * Delete an applet by its id
   * @param id Applet id
   * @param userId User id
   */
  async delete(id: number, userId: number): Promise<any> {
    const applet = await this.appletRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!applet) throw new Error('Applet not found');

    // await this.appletConfigService.delete(id);
    return this.appletRepository.delete(id);
  }
}
