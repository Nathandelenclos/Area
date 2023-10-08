import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AppletEntity } from './applet.entity';
import { AppletConfigService } from './configuration/applet.config.service';
import { AppletDto } from './applet.dto';
import { UserEntity } from '@app/common/users/user.entity';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { ActionEntity } from '@app/common/actions/action.entity';

export enum AppletRelations {
  CONFIG = 'applet_configs',
  USER = 'user',
  REACTIONS = 'reactions',
  ACTION = 'action',
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
   * @param reactions
   * @param action
   * @returns Applet
   */
  async create(
    data: AppletDto,
    user: DeepPartial<UserEntity>,
    reactions: DeepPartial<ReactionEntity>[],
    action: DeepPartial<ActionEntity>,
  ): Promise<AppletEntity> {
    const { config, ...appletData } = data;
    const applet = await this.appletRepository.save({
      ...appletData,
      user,
      reactions,
      action,
    });
    console.log('applet', applet);

    if (config) {
      this.appletConfigService.createMany(applet.id, config);
    }

    return applet;
  }

  /**
   * Find an applet by its id
   * @param data Applet data
   * @param relations Include relations
   */
  findOne(
    data: Partial<AppletDto>,
    relations: AppletRelations[] = [],
  ): Promise<AppletEntity> {
    return this.appletRepository.findOne({
      where: data,
      relations: relations,
    });
  }
}
