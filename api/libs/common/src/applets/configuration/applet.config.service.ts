import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppletConfigEntity } from './applet.config.entity';

@Injectable()
export class AppletConfigService {
  constructor(
    @InjectRepository(AppletConfigEntity)
    private readonly appletConfigRepository: Repository<AppletConfigEntity>,
  ) {}

  /**
   * Create a new applet configuration linked to an applet
   * @param applet_id Applet id to link the configuration to
   * @param data Configuration data
   */
  createMany(applet_id: any, data: any): void {
    Object.keys(data).map(async (key) => {
      await this.appletConfigRepository.save({
        key,
        value: data[key],
        applet: applet_id,
      });
    });
  }
}
