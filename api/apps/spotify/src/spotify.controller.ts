import { Controller } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import MicroServiceController from '@app/common/micro.service.controller';

@Controller()
export class SpotifyController extends MicroServiceController {
  constructor(private readonly spotifyService: SpotifyService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    this.spotifyService.cron();
  }
}
