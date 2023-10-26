import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionAppletEntity } from '@app/common';
import { Repository } from 'typeorm';

@Injectable()
export class ReactionAppletService {
  constructor(
    @InjectRepository(ReactionAppletEntity)
    private readonly reactionAppletRepository: Repository<ReactionAppletEntity>,
  ) {}
}
