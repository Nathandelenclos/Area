import { Controller } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { MicroServiceController } from '@app/common';

@Controller()
export class WeatherController extends MicroServiceController {
  constructor(private readonly weatherService: WeatherService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  cron(@Ctx() context: RmqContext) {
    this.ack(context);
    this.weatherService.cron();
  }
}
