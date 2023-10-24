import { Controller, Get, Param } from '@nestjs/common';
import {
  ServiceRelations,
  ServiceService,
} from '@app/common/services/service.service';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getServices() {
    return this.serviceService.findAll([
      ServiceRelations.ACTIONS,
      ServiceRelations.REACTIONS,
    ]);
  }

  @Get(':id')
  getService(@Param('id') id: number) {
    return this.serviceService.findOne({ id: id }, [
      ServiceRelations.ACTIONS,
      ServiceRelations.REACTIONS,
    ]);
  }

  @Get(':id/actions')
  async getServiceActions(@Param('id') id: number) {
    const service = await this.serviceService.findOne({ id }, [
      ServiceRelations.ACTIONS,
      ServiceRelations.ACTION_CONFIG,
    ]);
    return service.actions;
  }

  @Get(':id/reactions')
  async getServiceReactions(@Param('id') id: number) {
    const service = await this.serviceService.findOne({ id }, [
      ServiceRelations.REACTIONS,
      ServiceRelations.REACTION_CONFIG,
    ]);
    return service.reactions;
  }
}
