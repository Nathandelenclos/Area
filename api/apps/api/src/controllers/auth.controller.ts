import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import { Response } from 'express';
import { Public } from '@app/common/auth/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Public()
  @Post('register')
  register(@Body() data: any, @Res() res: Response): void {
    MicroServiceProxy.callMicroService(this.authService, 'register', data, res);
  }

  @Public()
  @Post('signin')
  signIn(@Body() data: any, @Res() res: Response): void {
    MicroServiceProxy.callMicroService(this.authService, 'signin', data, res);
  }

  @Get('me')
  getProfile(@Request() req: any): any {
    return req.user;
  }
}
