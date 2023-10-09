import { Controller } from '@nestjs/common';
import MicroServiceController from '@app/common/micro.service.controller';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
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
}
