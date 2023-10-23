import { Injectable } from '@nestjs/common';
import { ActionEntity } from '@app/common/actions/action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { NewAction } from '@app/common/actions/action.dto';
import { AppletConfigService } from '@app/common/applets/configuration/applet.config.service';

export enum ActionRelations {
  SERVICE = 'service',
}

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: Repository<ActionEntity>,
    private readonly appletConfigService: AppletConfigService,
  ) {}

  /**
   * Create a new action
   * @param data NewAction object
   * @returns Promise<ActionEntity>
   */
  async create(data?: NewAction): Promise<ActionEntity> {
    //return this.actionRepository.save(data);
    const action = await this.actionRepository.save({
      name: 'At date',
      description: 'Trigger at a specific date',
      is_available: true,
      service: { id: 16 },
    });

    const config = {
      date: 'date',
    };

    this.appletConfigService.createMany('action', action.id, config);
    return action;
  }

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
      relations: [...relations, 'action_configs'],
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
