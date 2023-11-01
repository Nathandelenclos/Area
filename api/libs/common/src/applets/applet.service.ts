import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppletEntity } from './applet.entity';
import { AppletDto } from './applet.dto';

export enum AppletRelations {
  USER = 'user',
  ACTIONS = 'actions.action',
  REACTIONS = 'reactions.reaction',
  ACTIONS_CONFIG = 'actions.configs',
  REACTIONS_CONFIG = 'reactions.configs',
  REACTION_SERVICE = 'reactions.reaction.service',
  ACTION_SERVICE = 'actions.action.service',
  ACTION_CONFIG = 'actions.action.config',
  REACTION_CONFIG = 'reactions.reaction.config',
  REACTION_CONFIGS = 'reactions.configs',
  ACTION_CONFIGS = 'actions.configs',
}

@Injectable()
export class AppletService {
  constructor(
    @InjectRepository(AppletEntity)
    private readonly appletRepository: Repository<AppletEntity>, // private readonly actionAppletService: ActionAppletService,
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
   * Find all applets by options
   * @param options Options
   * @param relations Include relations
   */
  find(
    options: Partial<AppletEntity>,
    relations: AppletRelations[] = [],
  ): Promise<AppletEntity[]> {
    return this.appletRepository.find({
      where: options,
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
   */
  async delete(id: number): Promise<any> {
    const applet = await this.appletRepository.findOne({
      where: { id },
    });
    if (!applet) throw new Error('Applet not found');

    return this.appletRepository.delete(id);
  }

  /**
   * Update an applet by its id
   * @param id
   * @param data
   */
  async update(id: number, data: Partial<AppletDto>): Promise<any> {
    const applet = await this.appletRepository.findOne({
      where: { id },
    });
    if (!applet) throw new Error('Applet not found');

    return this.appletRepository.update(id, data);
  }
}
