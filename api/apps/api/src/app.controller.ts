import { Body, Controller, Get, Inject, Ip, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { MicroServiceProxy, Public } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SERVICE_SERVICE') private readonly serviceService: ClientProxy,
  ) {}

  @Public()
  @Get('about.json')
  async getAbout(
    @Body() data: any,
    @Req() req: any,
    @Res() res: Response,
    @Ip() ip,
  ) {
    const services = await MicroServiceProxy.callMicroService(
      this.serviceService,
      'getServices',
      {},
    );
    res.status(500).send({
      client: {
        host: ip,
      },
      server: {
        current_time: Date.now(),
        services: services.data,
      },
    });
  }
}
