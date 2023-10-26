import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionAppletRelations, ReactionAppletEntity } from '@app/common';
import { DeleteResult, Repository } from 'typeorm';
import { NewReactionApplet } from '@app/common/reaction-applet/reaction.applet.dto';

export enum ReactionAppletRelations {
  APPLET = 'applet',
  REACTION = 'reaction',
  CONFIGS = 'configs',
}

@Injectable()
export class ReactionAppletService {
  constructor(
    @InjectRepository(ReactionAppletEntity)
    private readonly reactionAppletRepository: Repository<ReactionAppletEntity>,
  ) {}

  /**
   * Find all reaction applets
   * @returns Promise<ReactionAppletEntity[]>
   */
  findAll(): Promise<ReactionAppletEntity[]> {
    return this.reactionAppletRepository.find();
  }

  /**
   * Find a reaction applet by id
   * @param id ReactionAppletEntity id
   * @param relations
   * @returns Promise<ReactionAppletEntity | undefined>
   */
  findOne(
    id: number,
    relations?: ReactionAppletRelations[],
  ): Promise<ReactionAppletEntity | undefined> {
    return this.reactionAppletRepository.findOne({
      where: { id },
      relations,
    });
  }

  /**
   * Find a reaction applet by id
   * @param id ReactionAppletEntity id
   * @param relations
   * @returns Promise<ReactionAppletEntity[] | undefined>
   */
  findByAppletId(
    id: number,
    relations?: ReactionAppletRelations[],
  ): Promise<ReactionAppletEntity[] | undefined> {
    return this.reactionAppletRepository.find({
      where: { applet: { id } },
      relations,
    });
  }

  /**
   * Find a reaction applet by id
   * @param id ReactionAppletEntity id
   * @param relations
   * @returns Promise<ReactionAppletEntity | undefined>
   */
  findByReactionId(
    id: number,
    relations?: ReactionAppletRelations[],
  ): Promise<ReactionAppletEntity[] | undefined> {
    return this.reactionAppletRepository.find({
      where: { reaction: { id } },
      relations,
    });
  }

  /**
   * Find a reaction applet by id
   * @param appletId
   * @param reactionId
   * @param relations
   * @returns Promise<ReactionAppletEntity[] | undefined>
   */
  findByAppletAndReactionId(
    appletId: number,
    reactionId: number,
    relations?: ReactionAppletRelations[],
  ): Promise<ReactionAppletEntity[] | undefined> {
    return this.reactionAppletRepository.find({
      where: { applet: { id: appletId }, reaction: { id: reactionId } },
      relations,
    });
  }

  /**
   * Update a reaction applet
   * @param id ReactionAppletEntity id
   * @param data Data to update
   * @returns Promise<UpdateResult>
   */
  update(id: number, data: Partial<ReactionAppletEntity>) {
    return this.reactionAppletRepository.update(id, data);
  }

  /**
   * Remove a reaction applet
   * @param id ReactionAppletEntity id
   * @returns Promise<DeleteResult>
   */
  remove(id: number): Promise<DeleteResult> {
    return this.reactionAppletRepository.delete(id);
  }

  /**
   * Create a new reaction applet
   * @param data NewReactionApplet object
   * @returns Promise<NewReactionApplet & ReactionAppletEntity>
   */
  create(data: NewReactionApplet): Promise<ReactionAppletEntity> {
    return this.reactionAppletRepository.save({
      applet: { id: data.applet },
      reaction: { id: data.reaction },
      configs: data.configs.map((config) => ({ id: config })),
    });
  }
}
