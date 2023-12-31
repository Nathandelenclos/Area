import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { Public, MicroServiceProxy } from '@app/common';

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

  @Post('reset-password')
  resetPasswordPost(@Body() data: any, @Res() res: Response, @Req() req: any) {
    MicroServiceProxy.callMicroService(
      this.authService,
      'reset-password',
      { ...data, ...req.user },
      res,
    );
  }

  @Post('connect-oauth')
  connectOAuth(@Body() data: any, @Req() req: any, @Res() res: Response) {
    MicroServiceProxy.callMicroService(
      this.authService,
      'connect-oauth',
      { ...data, user: req.user },
      res,
    );
  }

  @Delete('delete-account')
  deleteAccount(@Req() req: any, @Res() res: Response) {
    MicroServiceProxy.callMicroService(
      this.authService,
      'delete-account',
      req.user,
      res,
    );
  }

  @Delete('delete-oauth/:id')
  deleteOAuth(@Param('id') id: string, @Req() req: any, @Res() res: Response) {
    MicroServiceProxy.callMicroService(
      this.authService,
      'delete-oauth',
      { id, user: req.user },
      res,
    );
  }

  @Public()
  @Get('github/authenticate/:code')
  githubAuthenticate(@Req() req: any, @Res() res: Response) {
    MicroServiceProxy.callMicroService(
      this.authService,
      'github-authenticate',
      req,
      res,
    );
  }

  @Public()
  @Get('spotify/authenticate/:code')
  spotifyAuthenticate(@Req() req: any, @Res() res: Response) {
    MicroServiceProxy.callMicroService(
      this.authService,
      'spotify-authenticate',
      req,
      res,
    );
  }
}
