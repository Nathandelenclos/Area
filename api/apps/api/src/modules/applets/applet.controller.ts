import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppletRelations, AppletService } from './applet.service';
import { Response } from 'express';
import { AppletDto } from './applet.dto';

@Controller('applet')
export class AppletController {
  constructor(private readonly appletsService: AppletService) {}

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response) {
    const response = await this.appletsService.findOne({ id: id }, [
      AppletRelations.CONFIG,
    ]);
    res.status(200).json(response);
  }

  @Post()
  create(@Body() data: AppletDto, @Res() res: Response) {
    const response = this.appletsService.create(data);
    res.status(200).json(response);
  }
}
