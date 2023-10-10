import { Injectable } from '@nestjs/common';

@Injectable()
export class GmailService {
  async cron(): Promise<void> {
    console.log('Gmail cron');
  }
}
