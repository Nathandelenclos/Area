import { Controller } from '@nestjs/common';
import { GmailService } from './gmail.service';
import MicroServiceController from '@app/common/micro.service.controller';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class GmailController extends MicroServiceController {
  constructor(private readonly gmailService: GmailService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    this.gmailService.cron();
  }
}
