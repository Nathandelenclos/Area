import { Controller } from '@nestjs/common';
import MicroServiceController from '@app/common/micro.service.controller';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import MicroServiceResponse from '@app/common/micro.service.response';
import { DiscordService } from './discord.service';

@Controller()
export class DiscordController extends MicroServiceController {
  constructor(private readonly discordService: DiscordService) {
    super();
  }

  @MessagePattern({ cmd: 'test' })
  async get(@Ctx() context: RmqContext) {
    this.ack(context);
    return new MicroServiceResponse({
      data: await this.discordService.test(),
    });
  }
}
