import { Controller } from '@nestjs/common';
import { TimerService } from './timer.service';
import MicroServiceController from '@app/common/micro.service.controller';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class TimerController extends MicroServiceController {
  constructor(private readonly timerService: TimerService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    this.timerService.cron();
  }
}
