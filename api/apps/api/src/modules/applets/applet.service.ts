import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppletEntity } from './applet.entity';
import { AppletConfigService } from './configuration/applet.config.service';
import { AppletDto } from './applet.dto';

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
    const { config, ...appletData } = data;
    const applet: AppletEntity = await this.appletRepository.save(appletData);

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
    relations: boolean = true,
  ): Promise<AppletEntity> {
    return this.appletRepository.findOne({
      where: data,
      relations: {
        applet_configs: relations,
      },
    });
  }
}
