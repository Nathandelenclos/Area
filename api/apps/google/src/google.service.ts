import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
  getHello(): string {
    return 'Hello World!';
  }
}
