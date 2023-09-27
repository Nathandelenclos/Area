import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @MessagePattern({cmd: 'auth'})
  async auth(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    channel.ack(message);

    return {message: 'Hello from auth service!'}
  }
}
