import { Controller } from '@nestjs/common';
import MicroServiceController from '@app/common/micro.service.controller';
import { CronService } from '../../cron/src/cron.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import MicroServiceResponse from '@app/common/micro.service.response';

@Controller()
export class DiscordController extends MicroServiceController {
  constructor(private readonly cronService: CronService) {
    super();
  }

  @MessagePattern({ cmd: 'get' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    return new MicroServiceResponse({
      data: 'Hello World! This is a cron.',
    });
  }
}
