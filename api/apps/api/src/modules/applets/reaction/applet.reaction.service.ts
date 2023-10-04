import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppletReactionEntity } from './applet.reaction.entity';

@Injectable()
export class AppletReactionService {
  constructor(
    @InjectRepository(AppletReactionEntity)
    private readonly appletRepository: Repository<AppletReactionEntity>,
  ) {}

  async create(data: any): Promise<AppletReactionEntity> {
    return await this.appletRepository.save(data);
  }
}
