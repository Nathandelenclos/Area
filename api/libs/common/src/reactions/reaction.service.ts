import { Injectable } from '@nestjs/common';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { DeleteResult, Repository } from 'typeorm';
import { NewReaction } from '@app/common/reactions/reaction.dto';
import { InjectRepository } from '@nestjs/typeorm';

export enum ReactionRelations {
  SERVICE = 'service',
}

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(ReactionEntity)
    private readonly reactionRepository: Repository<ReactionEntity>,
  ) {}

  create(data: NewReaction): Promise<ReactionEntity> {
    return this.reactionRepository.save(data);
  }

  findAll(relations: ReactionRelations[] = []): Promise<ReactionEntity[]> {
    return this.reactionRepository.find({
      relations,
    });
  }

  findOne(
    query: Partial<ReactionEntity>,
    relations: ReactionRelations[] = [],
  ): Promise<ReactionEntity | undefined> {
    return this.reactionRepository.findOne({
      where: query,
      relations,
    });
  }
  update(
    query: number | ReactionEntity | Partial<NewReaction>,
    data: Partial<ReactionEntity>,
  ) {
    return this.reactionRepository.update(query, data);
  }

  remove(
    query: number | ReactionEntity | Partial<NewReaction>,
  ): Promise<DeleteResult> {
    return this.reactionRepository.delete(query);
  }
}
