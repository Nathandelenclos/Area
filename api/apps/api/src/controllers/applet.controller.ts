import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  AppletRelations,
  AppletService,
} from '@app/common/applets/applet.service';
import { AppletDto } from '@app/common/applets/applet.dto';

@Controller('applets')
export class AppletController {
  constructor(private readonly appletService: AppletService) {}

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response) {
    console.log('id', id);
    const response = await this.appletService.findOne({ id: id }, [
      AppletRelations.CONFIG,
    ]);
    res.status(200).json(response);
  }

  @Post()
  async create(@Body() data: AppletDto, @Res() res: Response, @Req() req) {
    const response = await this.appletService.create(data, req.user.id);
    res.status(200).json(response);
  }
}
