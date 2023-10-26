import { Injectable } from '@nestjs/common';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { DeleteResult, Repository } from 'typeorm';
import { NewReaction } from '@app/common/reactions/reaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppletRequiredConfigService } from '@app/common/applets/required_configuration/applet.required.config.service';

export enum ReactionRelations {
  SERVICE = 'service',
  REQUIRE_CONFIGS = 'config',
  REACTION_APPLET = 'reactionApplets',
  CONFIGS = 'reactionApplets.configs',
  APPLET = 'reactionApplets.applet',
}

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(ReactionEntity)
    private readonly reactionRepository: Repository<ReactionEntity>,
    private readonly appletRequiredConfigService: AppletRequiredConfigService,
  ) {}

  /**
   * Find all reactions
   * @param relations Relations to include
   * @returns Promise<ReactionEntity[]>
   */
  findAll(relations: ReactionRelations[] = []): Promise<ReactionEntity[]> {
    return this.reactionRepository.find({
      relations: [...relations],
    });
  }

  /**
   * Find a reaction by id
   * @param query Query object
   * @param relations Relations to include
   * @returns Promise<ReactionEntity | undefined>
   */
  findOne(
    query: Partial<ReactionEntity>,
    relations: ReactionRelations[] = [],
  ): Promise<ReactionEntity | undefined> {
    return this.reactionRepository.findOne({
      where: query,
      relations,
    });
  }

  /**
   * Update a reaction
   * @param query Query object
   * @param data Data to update
   * @returns Promise<UpdateResult>
   */
  update(
    query: number | ReactionEntity | Partial<NewReaction>,
    data: Partial<ReactionEntity>,
  ) {
    return this.reactionRepository.update(query, data);
  }

  /**
   * Remove a reaction
   * @param query Query object
   * @returns Promise<DeleteResult>
   */
  remove(
    query: number | ReactionEntity | Partial<NewReaction>,
  ): Promise<DeleteResult> {
    return this.reactionRepository.delete(query);
  }
}
