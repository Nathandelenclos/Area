import { Controller } from '@nestjs/common';
import MicroServiceController from '@app/common/micro.service.controller';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  RmqContext,
} from '@nestjs/microservices';
import { DiscordService } from './discord.service';

@Controller()
export class DiscordController extends MicroServiceController {
  constructor(private readonly discordService: DiscordService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    this.discordService.cron();
  }

  @EventPattern('send_message')
  sendMessage(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    this.discordService.message(data.webhook, data.message);
  }
}
