import { Injectable } from '@nestjs/common';
import { ActionEntity } from '@app/common/actions/action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { NewAction } from '@app/common/actions/action.dto';
import { AppletRequiredConfigService } from '@app/common/applets/required_configuration/applet.required.config.service';

export enum ActionRelations {
  SERVICE = 'service',
  REQUIRE_CONFIG = 'config.action',
  APPLETS = 'applets',
  CONFIGS = 'applets.configs',
  APPLET = 'applets.applet',
}

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: Repository<ActionEntity>,
    private readonly appletRequiredConfigService: AppletRequiredConfigService,
  ) {}

  /**
   * Find all actions
   * @param relations Relations to include
   * @returns Promise<ActionEntity[]>
   */
  findAll(relations: ActionRelations[] = []): Promise<ActionEntity[]> {
    return this.actionRepository.find({
      relations: [...relations, 'action_configs'],
    });
  }

  /**
   * Find an action by id
   * @param query Query object
   * @param relations Relations to include
   * @returns Promise<ActionEntity | undefined>
   */
  findOne(
    query: Partial<ActionEntity>,
    relations: ActionRelations[] = [],
  ): Promise<ActionEntity | undefined> {
    return this.actionRepository.findOne({
      where: query,
      relations: relations,
    });
  }

  /**
   * Update an action
   * @param query Query object
   * @param data Data to update
   * @returns Promise<UpdateResult>
   */
  update(
    query: number | ActionEntity | Partial<NewAction>,
    data: Partial<ActionEntity>,
  ) {
    return this.actionRepository.update(query, data);
  }

  /**
   * Remove an action
   * @param query Query object
   * @returns Promise<DeleteResult>
   */
  remove(
    query: number | ActionEntity | Partial<NewAction>,
  ): Promise<DeleteResult> {
    return this.actionRepository.delete(query);
  }
}
