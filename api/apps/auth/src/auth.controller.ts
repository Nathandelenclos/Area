import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import MicroServiceController from '@app/common/micro.service.controller';
import MicroServiceResponse from '@app/common/micro.service.response';

@Controller()
export class AuthController extends MicroServiceController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @MessagePattern({ cmd: 'register' })
  async register(@Ctx() context: RmqContext) {
    return new MicroServiceResponse({
      data: await this.authService.register(this.ack(context)),
    });
  }

  @MessagePattern({ cmd: 'signin' })
  async signIn(@Ctx() context: RmqContext) {
    console.log('iciciii');
    const data = this.ack(context);
    return new MicroServiceResponse({
      data: await this.authService.signIn(data.username, data.password),
    });
  }
}
