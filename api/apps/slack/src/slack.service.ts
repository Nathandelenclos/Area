import { Injectable } from '@nestjs/common';

@Injectable()
export class SlackService {
  cron(): void {}

  async message(webhook: string, message: string) {
    if (!webhook || !message) return;
    await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
      }),
    });
  }
}
