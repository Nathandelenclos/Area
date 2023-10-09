import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import MicroServiceController from '@app/common/micro.service.controller';

@Controller()
export class AuthController extends MicroServiceController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @MessagePattern({ cmd: 'register' })
  register(@Ctx() context: RmqContext) {
    return this.authService.register(this.ack(context));
  }

  @MessagePattern({ cmd: 'oauth' })
  async oAuth(@Ctx() context: RmqContext) {
    return await this.authService.oAuth(this.ack(context));
  }

  @MessagePattern({ cmd: 'signin' })
  async signIn(@Ctx() context: RmqContext) {
    return await this.authService.signIn(this.ack(context));
  }

  @MessagePattern({ cmd: 'signoauth' })
  async signOAuth(@Ctx() context: RmqContext) {
    return await this.authService.signOAuth(this.ack(context));
  }

  @MessagePattern({ cmd: 'me' })
  async me(@Ctx() context: RmqContext) {
    return this.authService.me(this.ack(context));
  }
}
