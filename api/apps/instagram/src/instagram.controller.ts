import { Controller } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import MicroServiceController from '@app/common/micro.service.controller';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import MicroServiceResponse from '@app/common/micro.service.response';

@Controller()
export class InstagramController extends MicroServiceController {
  constructor(private readonly instagramService: InstagramService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    this.instagramService.cron();
  }
}
