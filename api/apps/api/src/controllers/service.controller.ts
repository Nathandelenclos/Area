import { Body, Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroServiceProxy, Public } from '@app/common';
import { Response } from 'express';

@Controller('services')
export class ServiceController {
  constructor(
    @Inject('SERVICE_SERVICE') private readonly serviceService: ClientProxy,
  ) {}

  @Public()
  @Get()
  getServices(@Body() data: any, @Res() res: Response) {
    return MicroServiceProxy.callMicroService(
      this.serviceService,
      'getServices',
      {},
      res,
    );
  }

  @Public()
  @Get(':id')
  getService(@Param('id') id: number, @Body() data: any, @Res() res: Response) {
    return MicroServiceProxy.callMicroService(
      this.serviceService,
      'getService',
      { id },
      res,
    );
  }

  @Public()
  @Get(':id/actions')
  async getServiceActions(
    @Param('id') id: number,
    @Body() data: any,
    @Res() res: Response,
  ) {
    return MicroServiceProxy.callMicroService(
      this.serviceService,
      'getAction',
      { id },
      res,
    );
  }

  @Public()
  @Get(':id/reactions')
  async getServiceReactions(
    @Param('id') id: number,
    @Body() data: any,
    @Res() res: Response,
  ) {
    return MicroServiceProxy.callMicroService(
      this.serviceService,
      'getReaction',
      { id },
      res,
    );
  }
}
