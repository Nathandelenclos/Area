import { Injectable } from '@nestjs/common';
import { ServiceEntity } from '@app/common/services/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { NewService } from '@app/common/services/service.dto';

export enum ServiceRelations {
  ACTIONS = 'actions',
  REACTIONS = 'reactions',
}

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  /**
   * Create a new service
   * @param data NewService object
   * @returns Promise<NewService & ServiceEntity>
   */
  create(data: NewService): Promise<ServiceEntity> {
    return this.serviceRepository.save(data);
  }

  /**
   * Find all services
   * @returns Promise<ServiceEntity[]>
   */
  findAll(relations: ServiceRelations[] = []): Promise<ServiceEntity[]> {
    return this.serviceRepository.find({
      relations,
    });
  }

  /**
   * Find a service by id
   * @param query Query object
   * @param relations Relations to include
   * @returns Promise<ServiceEntity | undefined>
   */
  findOne(
    query: Partial<ServiceEntity>,
    relations: ServiceRelations[] = [],
  ): Promise<ServiceEntity | undefined> {
    return this.serviceRepository.findOne({
      where: query,
      relations,
    });
  }

  /**
   * Update a service
   * @param id Service id
   * @param data Data to update
   * @returns Promise<UpdateResult>
   */
  update(id: number, data: Partial<ServiceEntity>) {
    return this.serviceRepository.update(id, data);
  }

  /**
   * Remove a service
   * @param id Service id
   * @returns Promise<DeleteResult>
   */
  remove(id: number): Promise<DeleteResult> {
    return this.serviceRepository.delete(id);
  }
}
