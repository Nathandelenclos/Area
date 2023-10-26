import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionAppletEntity } from '@app/common';
import { Repository } from 'typeorm';
import { NewActionApplet } from '@app/common/action-applet/action-applet.dto';

export enum ActionAppletRelations {
  APPLET = 'applet',
  ACTION = 'action',
  CONFIGS = 'configs',
}

@Injectable()
export class ActionAppletService {
  constructor(
    @InjectRepository(ActionAppletEntity)
    private readonly actionAppletRepository: Repository<ActionAppletEntity>,
  ) {}

  /**
   * Find all action applets
   * @returns Promise<ActionAppletEntity[]>
   */
  findAll(relations?: ActionAppletRelations[]): Promise<ActionAppletEntity[]> {
    return this.actionAppletRepository.find({ relations });
  }

  /**
   * Find an action applet by id
   * @param id ActionAppletEntity id
   * @param relations
   * @returns Promise<ActionAppletEntity | undefined>
   */
  findOne(
    id: number,
    relations?: ActionAppletRelations[],
  ): Promise<ActionAppletEntity | undefined> {
    return this.actionAppletRepository.findOne({
      where: { id },
      relations,
    });
  }

  /**
   * Find an action applet by id
   * @param id ActionAppletEntity id
   * @param relations
   * @returns Promise<ActionAppletEntity[] | undefined>
   */
  findByAppletId(
    id: number,
    relations?: ActionAppletRelations[],
  ): Promise<ActionAppletEntity[] | undefined> {
    return this.actionAppletRepository.find({
      where: { applet: { id } },
      relations,
    });
  }

  /**
   * Find an action applet by id
   * @param id ActionAppletEntity id
   * @param relations
   * @returns Promise<ActionAppletEntity[] | undefined>
   */
  findByActionId(
    id: number,
    relations?: ActionAppletRelations[],
  ): Promise<ActionAppletEntity[] | undefined> {
    return this.actionAppletRepository.find({
      where: { action: { id } },
      relations,
    });
  }

  /**
   * Find an action applet by id
   * @param appletId
   * @param actionId
   * @param relations
   */
  findByAppletAndActionId(
    appletId: number,
    actionId: number,
    relations?: ActionAppletRelations[],
  ): Promise<ActionAppletEntity[] | undefined> {
    return this.actionAppletRepository.find({
      where: { applet: { id: appletId }, action: { id: actionId } },
      relations,
    });
  }

  /**
   * Create a new action applet
   * @param data NewActionApplet object
   * @returns Promise<NewActionApplet & ActionAppletEntity>
   */
  create(data: NewActionApplet): Promise<ActionAppletEntity> {
    return this.actionAppletRepository.save({
      action: { id: data.action },
      applet: { id: data.applet },
      configs: data.configs.map((config) => ({ id: config })),
    });
  }

  /**
   * Update an action applet
   * @param id ActionAppletEntity id
   * @param data Data to update
   * @returns Promise<UpdateResult>
   */
  update(id: number, data: Partial<ActionAppletEntity>) {
    return this.actionAppletRepository.update(id, data);
  }
}
