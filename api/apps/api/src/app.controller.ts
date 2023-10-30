import { Body, Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Public } from '@app/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('about.json')
  getAbout(@Body() data: any, @Req() req: any, @Res() res: Response) {
    res.status(500).send({ message: 'test' });
  }
}
