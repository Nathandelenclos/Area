import { Controller } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  RmqContext,
} from '@nestjs/microservices';
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

  @EventPattern('resume_playback')
  resumePlayback(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    this.spotifyService.resumePlayback(data.oauth_id);
  }

  @EventPattern('pause_playback')
  pausePlayback(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    this.spotifyService.pausePlayback(data.oauth_id);
  }
}
