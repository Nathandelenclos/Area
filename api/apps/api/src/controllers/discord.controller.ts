import { Controller, Get, Inject, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from '@app/common/auth/public.decorator';
import { Response } from 'express';
import MicroServiceProxy from '@app/common/micro.service.proxy';

@Controller('discord')
export class DiscordController {
  constructor(
    @Inject('DISCORD_SERVICE') private readonly discordService: ClientProxy,
  ) {}

  @Public()
  @Get()
  test(@Res() res: Response) {
    MicroServiceProxy.callMicroService(this.discordService, 'test', {}, res);
  }
}
