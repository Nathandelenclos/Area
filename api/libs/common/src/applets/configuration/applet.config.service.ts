import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AppletConfigEntity } from './applet.config.entity';

@Injectable()
export class AppletConfigService {
  constructor(
    @InjectRepository(AppletConfigEntity)
    private readonly appletConfigRepository: Repository<AppletConfigEntity>,
  ) {}

  /**
   * Create a new applet configuration linked to an applet
   * @param id Applet id to link the configuration to
   * @param data Configuration data
   */
  createMany(id: any, data: any): void {
    Object.keys(data).map(async (key) => {
      await this.appletConfigRepository.save({
        key,
        value: data[key],
        applet: id,
      });
    });
  }

  /**
   * Update an applet configuration
   * @param id Applet configuration id
   * @param data Configuration data
   */
  update(id: number, data: DeepPartial<AppletConfigEntity>): Promise<any> {
    return this.appletConfigRepository.update(id, data);
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
