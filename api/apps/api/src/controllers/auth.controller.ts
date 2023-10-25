import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
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
  register(@Body() data: any, @Res() res: Response) {
    MicroServiceProxy.callMicroService(this.authService, 'register', data, res);
  }

  @Public()
  @Post('signin')
  signIn(@Body() data: any, @Res() res: Response) {
    MicroServiceProxy.callMicroService(this.authService, 'signing', data, res);
  }

  @Public()
  @Post('signoauth')
  signOAuth(@Body() data: any, @Res() res: Response) {
    MicroServiceProxy.callMicroService(
      this.authService,
      'signoauth',
      data,
      res,
    );
  }

  @Get('me')
  me(@Res() res: Response, @Req() req: any) {
    MicroServiceProxy.callMicroService(this.authService, 'me', req.user, res);
  }

  @Get('recover-password')
  recoverPassword(@Res() res: Response, @Req() req: any) {
    MicroServiceProxy.callMicroService(
      this.authService,
      'recover-password',
      req.user,
      res,
    );
  }

  @Get('reset-password/:token')
  resetPassword(
    @Param('token') token: string,
    @Res() res: Response,
    @Req() req: any,
  ) {
    MicroServiceProxy.callMicroService(
      this.authService,
      'reset-password',
      { token, ...req.user },
      res,
    );
  }
}
