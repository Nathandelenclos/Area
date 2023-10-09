import { Injectable } from '@nestjs/common';

@Injectable()
export class YoutubeService {
  async cron(): Promise<void> {
    console.log('Youtube cron');
  }
}
