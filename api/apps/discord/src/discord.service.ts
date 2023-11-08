import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordService {
  constructor() {}

  cron(): void {}

  async message(webhook: string, message: string) {
    try {
      if (!webhook || !message) return;
      await fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }
}
