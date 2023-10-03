import { Controller, Get } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @MessagePattern({cmd: 'spotify'})
  async auth(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    channel.ack(message);

    return {message: 'Hello from spotify service!'}
  }
}
