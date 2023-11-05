import { Controller } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import MicroServiceController from '@app/common/micro.service.controller';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class FacebookController extends MicroServiceController {
  constructor(private readonly facebookService: FacebookService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    this.facebookService.cron();
  }
}
