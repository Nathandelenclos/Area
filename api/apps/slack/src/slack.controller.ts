import { Controller } from '@nestjs/common';
import { SlackService } from './slack.service';
import { MicroServiceController } from '@app/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class SlackController extends MicroServiceController {
  constructor(private readonly slackService: SlackService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  cron(@Ctx() context: RmqContext) {
    this.ack(context);
    this.slackService.cron();
  }

  @EventPattern('send_message')
  sendMessage(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    this.slackService.message(data.webhook, data.message);
  }
}
