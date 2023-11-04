import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import MicroServiceController from '@app/common/micro.service.controller';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class NewsController extends MicroServiceController {
  constructor(private readonly newsService: NewsService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  cron(@Ctx() context: RmqContext) {
    this.ack(context);
    this.newsService.cron();
  }
}
