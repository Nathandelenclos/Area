import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionAppletEntity } from '@app/common';
import { Repository } from 'typeorm';

@Injectable()
export class ActionAppletService {
  constructor(
    @InjectRepository(ActionAppletEntity)
    private readonly actionAppletRepository: Repository<ActionAppletEntity>,
  ) {}
}
