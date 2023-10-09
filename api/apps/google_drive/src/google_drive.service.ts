import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleDriveService {
  async cron(): Promise<void> {
    console.log('Google Drive cron');
  }
}
