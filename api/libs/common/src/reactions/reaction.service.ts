import { Injectable } from '@nestjs/common';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { DeleteResult, Repository } from 'typeorm';
import { NewReaction } from '@app/common/reactions/reaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewAction } from '@app/common/actions/action.dto';
import { AppletRequiredConfigService } from '@app/common/applets/required_configuration/applet.required.config.service';

export enum ReactionRelations {
  SERVICE = 'service',
  APPLETS = 'applets',
}

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(ReactionEntity)
    private readonly reactionRepository: Repository<ReactionEntity>,
    private readonly appletRequiredConfigService: AppletRequiredConfigService,
  ) {}

  /**
   * Create a new reaction
   * @param data NewReaction object
   * @returns Promise<ReactionEntity>
   */
  async create(data?: NewAction): Promise<ReactionEntity> {
    //return this.reactionRepository.save(data);
    const cmd: string = 'message';

    const reaction = await this.reactionRepository.save({
      name: 'Discord Message',
      description: 'Send a discord message through a webhook',
      is_available: true,
      service: { id: 1 },
      cmd,
    });

    /*
    const config = {
      webhook: 'string',
      message: 'string',
    };

    this.appletRequiredConfigService.createMany(
      'reaction',
      reaction.id,
      config,
    );
    */
    return reaction;
  }

  /**
   * Find all reactions
   * @param relations Relations to include
   * @returns Promise<ReactionEntity[]>
   */
  findAll(relations: ReactionRelations[] = []): Promise<ReactionEntity[]> {
    return this.reactionRepository.find({
      relations: [...relations, 'reaction_configs'],
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
