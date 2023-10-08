import { Controller } from '@nestjs/common';
import { CronService } from './cron.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import MicroServiceController from '@app/common/micro.service.controller';
import MicroServiceResponse from '@app/common/micro.service.response';

@Controller()
export class CronController extends MicroServiceController {
  constructor(private readonly cronService: CronService) {
    super();
  }

  @MessagePattern({ cmd: 'test' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    console.log('test');
    return new MicroServiceResponse({
      data: 'Hello World! This is a cron.',
    });
  }
}
