import { Controller } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { MicroServiceController } from '@app/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class TeamsController extends MicroServiceController {
  constructor(private readonly teamsService: TeamsService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  cron(@Ctx() context: RmqContext) {
    this.ack(context);
    this.teamsService.cron();
  }

  @EventPattern('send_message')
  sendMessage(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    this.teamsService.message(data.webhook, data.message);
  }
}
