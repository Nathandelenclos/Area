import { Injectable } from '@nestjs/common';

@Injectable()
export class FacebookService {
  constructor() {}

  cron(): void {
    Promise.all([this.onPost()]);
  }

  async onPost(): Promise<void> {
    console.log('onPost');
  }
}
