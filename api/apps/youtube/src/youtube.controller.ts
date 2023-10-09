import { Controller } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import MicroServiceController from '@app/common/micro.service.controller';

@Controller()
export class YoutubeController extends MicroServiceController {
  constructor(private readonly youtubeService: YoutubeService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    this.youtubeService.cron();
  }
}
