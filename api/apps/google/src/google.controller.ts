import { Controller, Get } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller()
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  getHello(): string {
    return this.googleService.getHello();
  }
}
