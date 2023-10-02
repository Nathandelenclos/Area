import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import { Response } from 'express';
import { AuthGuard } from '@app/common/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() data: any, @Res() res: Response): void {
    MicroServiceProxy.callMicroService(this.authService, 'register', data, res);
  }

  @Post('signin')
  signIn(@Body() data: any, @Res() res: Response): void {
    MicroServiceProxy.callMicroService(this.authService, 'signin', data, res);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req: any): any {
    return req.user;
  }
}
