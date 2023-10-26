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
import { Response } from 'express';
import { AppletCreateDto } from '@app/common/applets/applet.dto';
import { DeepPartial } from 'typeorm';
import { UserEntity } from '@app/common/users/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { MicroServiceProxy } from '@app/common';

@Controller('applets')
export class AppletController {
  constructor(
    @Inject('APPLET_SERVICE') private readonly appletService: ClientProxy,
  ) {}

  @Get(':id')
  findById(@Param('id') id: number, @Res() res: Response) {
    MicroServiceProxy.callMicroService(
      this.appletService,
      'findById',
      { id },
      res,
    );
  }

  @Post()
  create(
    @Body() data: AppletCreateDto,
    @Res() res: Response,
    @Req() req: { user: { id: number } },
  ) {
    MicroServiceProxy.callMicroService(
      this.appletService,
      'create',
      {
        ...data,
        user: req.user.id as Partial<UserEntity>,
      },
      res,
    );
  }

  @Delete(':id')
  delete(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: { user: { id: number } },
  ) {
    MicroServiceProxy.callMicroService(
      this.appletService,
      'delete',
      {
        id,
        user: req.user.id as DeepPartial<UserEntity>,
      },
      res,
    );
  }
}
