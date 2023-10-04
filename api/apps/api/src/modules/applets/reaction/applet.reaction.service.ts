import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppletReactionEntity } from './applet.reaction.entity';

@Injectable()
export class AppletReactionService {
  constructor(
    @InjectRepository(AppletReactionEntity)
    private readonly appletReactionRepository: Repository<AppletReactionEntity>,
  ) {}
}
