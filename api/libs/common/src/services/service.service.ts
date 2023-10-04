import { Injectable } from '@nestjs/common';
import { ServiceEntity } from '@app/common/services/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { NewService } from '@app/common/services/service.dto';

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
  create(data: NewService): Promise<NewService & ServiceEntity> {
    return this.serviceRepository.save(data);
  }

  /**
   * Find all services
   * @returns Promise<ServiceEntity[]>
   */
  findAll(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find();
  }

  /**
   * Find a service by id
   * @param query Query object
   * @returns Promise<ServiceEntity | undefined>
   */
  findOne(query: any): Promise<ServiceEntity | undefined> {
    return this.serviceRepository.findOne({
      where: query,
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
