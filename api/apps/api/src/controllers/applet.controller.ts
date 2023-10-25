import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  AppletRelations,
  AppletService,
} from '@app/common/applets/applet.service';
import { AppletCreateDto } from '@app/common/applets/applet.dto';
import { DeepPartial } from 'typeorm';
import { UserEntity } from '@app/common/users/user.entity';

@Controller('applets')
export class AppletController {
  constructor(private readonly appletService: AppletService) {}

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response) {
    const response = await this.appletService.findOne({ id: id }, [
      AppletRelations.CONFIG,
      AppletRelations.ACTION,
      AppletRelations.REACTIONS,
      AppletRelations.USER,
      AppletRelations.SERVICE,
    ]);
    res.status(200).json(response);
  }

  @Post()
  async create(
    @Body() data: AppletCreateDto,
    @Res() res: Response,
    @Req() req: { user: { id: number } },
  ) {
    try {
      const response = await this.appletService.create(
        data,
        req.user.id as DeepPartial<UserEntity>,
        data.service,
        data.reaction,
        data.action,
      );
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: { user: { id: number } },
  ) {
    try {
      const response = await this.appletService.delete(id, req.user.id);
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}
