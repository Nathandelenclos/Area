import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AppletRequiredConfigEntity } from '@app/common/applets/required_configuration/applet.required.config.entity';

type AppletConfigLinkableEntities = 'action' | 'reaction';

@Injectable()
export class AppletRequiredConfigService {
  constructor(
    @InjectRepository(AppletRequiredConfigEntity)
    private readonly appletRequiredConfigRepository: Repository<AppletRequiredConfigEntity>,
  ) {}

  /**
   * Create a new applet required configuration linked to an action or a reaction
   * @param entity Applet entity to link the configuration to
   * @param id Applet id to link the configuration to
   * @param data Configuration data
   */
  createMany(
    entity: AppletConfigLinkableEntities,
    id: any,
    data: DeepPartial<AppletRequiredConfigEntity>[],
  ): void {
    data.map(async (config) => {
      if (!config.key || !config.type) return;
      await this.appletRequiredConfigRepository.save({
        ...config,
        [entity]: id,
      });
    });
  }

  /**
   * Find all required configurations linked to an action or a reaction
   * @param entity Applet entity to link the configuration to
   * @param id Applet id to link the configuration to
   */
  findByLinkableEntity(entity: AppletConfigLinkableEntities, id: number) {
    return this.appletRequiredConfigRepository.find({
      where: { [entity]: { id } },
    });
  }

  /**
   * Update an applet configuration
   * @param id Applet configuration id
   * @param data Configuration data
   */
  update(id: number, data: DeepPartial<AppletRequiredConfigEntity>): void {
    this.appletRequiredConfigRepository.update(id, data);
  }

  /**
   * Delete an applet configuration
   * @param action_id
   * @param reaction_id
   */
  async delete(
    action_id: number | null,
    reaction_id: number | null,
  ): Promise<any> {
    const action_configs = action_id
      ? await this.appletRequiredConfigRepository.find({
          where: { action: { id: action_id } },
        })
      : [];
    const reaction_configs = reaction_id
      ? await this.appletRequiredConfigRepository.find({
          where: { reaction: { id: reaction_id } },
        })
      : [];

    const configIds = [
      ...action_configs.map((config) => config.id),
      ...reaction_configs.map((config) => config.id),
    ];

    return this.appletRequiredConfigRepository.delete(configIds);
  }
}
