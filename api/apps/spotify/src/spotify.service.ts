import { Injectable } from '@nestjs/common';

@Injectable()
export class SpotifyService {
  async cron(): Promise<void> {
    console.log('Spotify cron');
  }
}
