import { Injectable } from '@nestjs/common';
import { ActionService } from '@app/common/actions/action.service';
import { ServiceService } from '@app/common/services/service.service';
import { ReactionService } from '@app/common/reactions/reaction.service';

@Injectable()
export class DiscordService {
  constructor() {}

  async cron(): Promise<void> {}

  async message(webhook: string, message: string) {
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
  }
}
