import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppletConfigEntity } from './applet.config.entity';

type AppletConfigLinkableEntities = 'applet' | 'action' | 'reaction';

@Injectable()
export class AppletConfigService {
  constructor(
    @InjectRepository(AppletConfigEntity)
    private readonly appletConfigRepository: Repository<AppletConfigEntity>,
  ) {}

  /**
   * Create a new applet configuration linked to an applet
   * @param entity Applet entity to link the configuration to
   * @param id Applet id to link the configuration to
   * @param data Configuration data
   */
  createMany(entity: AppletConfigLinkableEntities, id: any, data: any): void {
    Object.keys(data).map(async (key) => {
      await this.appletConfigRepository.save({
        key,
        value: data[key],
        [entity]: id,
      });
    });
  }

  /**
   * Delete an applet configuration
   * @param applet_id
   */
  async delete(applet_id: number): Promise<any> {
    const configs = await this.appletConfigRepository.find({
      where: { applet: { id: applet_id } },
    });
    const configIds = configs.map((config) => config.id);

    return this.appletConfigRepository.delete(configIds);
  }
}
