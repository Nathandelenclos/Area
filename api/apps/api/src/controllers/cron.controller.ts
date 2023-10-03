import { Controller, Get, Inject, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import { Public } from '@app/common/auth/public.decorator';
import { Response } from 'express';

@Controller('cron')
export class CronController {
  constructor(
    @Inject('CRON_SERVICE') private readonly cronService: ClientProxy,
  ) {}

  @Public()
  @Get()
  test(@Res() res: Response) {
    MicroServiceProxy.callMicroService(this.cronService, 'test', {}, res);
  }
}
