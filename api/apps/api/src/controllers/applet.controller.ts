import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { MicroServiceProxy } from '@app/common';

@Controller('applets')
export class AppletController {
  constructor(
    @Inject('APPLET_SERVICE') private readonly appletService: ClientProxy,
  ) {}

  @Get()
  findAll(@Res() res: Response, @Req() req: { user: { id: number } }) {
    MicroServiceProxy.callMicroService(
      this.appletService,
      'findAll',
      { user: req.user },
      res,
    );
  }

  @Get(':id')
  findById(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request & { user: { id: number } },
  ) {
    console.log('req.user', req.user);
    console.log('id', id);
    MicroServiceProxy.callMicroService(
      this.appletService,
      'findById',
      { id, user: req.user },
      res,
    );
  }

  @Post()
  create(
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request & { user: { id: number } },
  ) {
    MicroServiceProxy.callMicroService(
      this.appletService,
      'create',
      {
        ...data,
        user: req.user,
      },
      res,
    );
  }

  @Delete(':id')
  delete(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request & { user: { id: number } },
  ) {
    MicroServiceProxy.callMicroService(
      this.appletService,
      'delete',
      {
        id,
        user: req.user,
      },
      res,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: any,
    @Res() res: Response,
    @Req() req: Request & { user: { id: number } },
  ) {
    MicroServiceProxy.callMicroService(
      this.appletService,
      'update',
      {
        id,
        data,
        user: req.user,
      },
      res,
    );
  }
}
