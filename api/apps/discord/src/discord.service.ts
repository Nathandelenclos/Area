import { Injectable } from '@nestjs/common';
import { ActionService } from '@app/common/actions/action.service';
import {
  ServiceRelations,
  ServiceService,
} from '@app/common/services/service.service';
import { ReactionService } from '@app/common/reactions/reaction.service';

@Injectable()
export class DiscordService {
  constructor(
    private readonly actionService: ActionService,
    private readonly serviceService: ServiceService,
    private readonly reactionService: ReactionService,
  ) {}

  async test() {
    const service = await this.serviceService.create({
      name: 'Discord',
      url: 'https://discord.com/api/webhooks/...',
      is_available: true,
    });

    await this.actionService.create({
      name: 'Send Message',
      is_available: true,
      description: 'Send a message to a Discord channel.',
      service,
    });

    await this.reactionService.create({
      name: 'Send Message',
      is_available: true,
      description: 'Send a message to a Discord channel.',
      service,
    });

    return this.serviceService.findAll([
      ServiceRelations.ACTIONS,
      ServiceRelations.REACTIONS,
    ]);
  }
}
