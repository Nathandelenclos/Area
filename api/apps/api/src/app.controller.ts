import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {
  }

  @Get()
  async auth() {
    return this.authService.send({
      cmd: 'spotify',
    }, {});
  }
}
