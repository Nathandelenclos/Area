import { Injectable } from '@nestjs/common';

@Injectable()
export class AppletService {
  getHello(): string {
    return 'Hello World!';
  }
}
