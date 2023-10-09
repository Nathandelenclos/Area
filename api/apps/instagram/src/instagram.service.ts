import { Injectable } from '@nestjs/common';

@Injectable()
export class InstagramService {
  async cron(): Promise<void> {
    console.log('Instagram cron');
  }
}
