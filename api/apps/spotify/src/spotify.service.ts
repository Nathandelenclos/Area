import { Injectable } from '@nestjs/common';

@Injectable()
export class SpotifyService {
  getHello(): string {
    return 'Hello World!';
  }
}
