import { Injectable } from '@nestjs/common';
import { ActionEntity } from '@app/common/actions/action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { NewAction } from '@app/common/actions/action.dto';

export enum ActionRelations {
  SERVICE = 'service',
}

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: Repository<ActionEntity>,
  ) {}

  create(data: NewAction): Promise<ActionEntity> {
    return this.actionRepository.save(data);
  }

  findAll(relations: ActionRelations[] = []): Promise<ActionEntity[]> {
    return this.actionRepository.find({
      relations,
    });
  }

  findOne(
    query: Partial<ActionEntity>,
    relations: ActionRelations[] = [],
  ): Promise<ActionEntity | undefined> {
    return this.actionRepository.findOne({
      where: query,
      relations,
    });
  }

  update(
    query: number | ActionEntity | Partial<NewAction>,
    data: Partial<ActionEntity>,
  ) {
    return this.actionRepository.update(query, data);
  }

  remove(
    query: number | ActionEntity | Partial<NewAction>,
  ): Promise<DeleteResult> {
    return this.actionRepository.delete(query);
  }
}
