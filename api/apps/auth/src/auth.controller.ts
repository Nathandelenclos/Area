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
  async register(@Ctx() context: RmqContext) {
    return this.authService.register(this.ack(context));
  }

  @MessagePattern({ cmd: 'signin' })
  async signIn(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    return this.authService.signIn(data.username, data.password);
  }
}
