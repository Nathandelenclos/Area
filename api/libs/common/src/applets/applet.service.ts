import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AppletEntity } from './applet.entity';
import { AppletConfigService } from './configuration/applet.config.service';
import { AppletCreateDto, AppletDto } from './applet.dto';
import { UserEntity } from '@app/common/users/user.entity';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ServiceEntity } from '@app/common/services/service.entity';

export enum AppletRelations {
  CONFIG = 'applet_configs',
  USER = 'user',
  SERVICE = 'service',
  REACTIONS = 'reaction',
  ACTION = 'action',
  REACTION_SERVICE = 'reaction.service',
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
   * @param user
   * @param service
   * @param reaction
   * @param action
   * @returns Applet
   */
  async create(
    data: AppletDto,
    user: DeepPartial<UserEntity>,
    service: DeepPartial<ServiceEntity>,
    reaction: DeepPartial<ReactionEntity>,
    action: DeepPartial<ActionEntity>,
  ): Promise<AppletEntity> {
    const { config, ...appletData } = data;
    const applet = await this.appletRepository.save({
      ...appletData,
      service,
      user,
      reaction,
      action,
    });

    if (config) {
      this.appletConfigService.createMany('applet', applet.id, config);
    }

    return applet;
  }

  /**
   * Find an applet by its id
   * @param options
   * @param relations Include relations
   */
  findOne(
    options: Partial<AppletDto>,
    relations: AppletRelations[] = [],
  ): Promise<AppletEntity> {
    return this.appletRepository.findOne({
      where: options,
      relations: relations,
    });
  }

  /**
   * Find all applets matching the options
   * @param options
   * @param relations Include relations
   */
  findAll(
    options: DeepPartial<AppletEntity>,
    relations: AppletRelations[] = [],
  ): Promise<AppletEntity[]> {
    return this.appletRepository.find({
      where: options,
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

    await this.appletConfigService.delete(id);
    return this.appletRepository.delete(id);
  }
}
