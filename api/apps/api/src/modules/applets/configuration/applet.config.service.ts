import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppletConfigEntity } from './applet.config.entity';

@Injectable()
export class AppletConfigService {
  constructor(
    @InjectRepository(AppletConfigEntity)
    private readonly appletRepository: Repository<AppletConfigEntity>,
  ) {}

  createMany(applet_id: any, data: any): void {
    console.log('data', data);
    Object.keys(data).map(async (key) => {
      console.log('key', key);
      await this.appletRepository.save({
        key,
        value: data[key],
        applet: applet_id,
      });
    });
  }
}
