import { Controller } from '@nestjs/common';
import { GoogleService } from './google.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  RmqContext,
} from '@nestjs/microservices';
import MicroServiceController from '@app/common/micro.service.controller';

@Controller()
export class GoogleController extends MicroServiceController {
  constructor(private readonly googleService: GoogleService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    this.googleService.cron();
  }

  @EventPattern('send_email')
  sendMessage(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    this.googleService.sendEmail(
      data.oauth_id,
      data.from_email,
      data.to_email,
      data.subject,
      data.message,
    );
  }
}
