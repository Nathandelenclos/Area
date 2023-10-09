import { Injectable } from '@nestjs/common';
import { ActionService } from '@app/common/actions/action.service';
import { ServiceService } from '@app/common/services/service.service';
import { ReactionService } from '@app/common/reactions/reaction.service';

@Injectable()
export class DiscordService {
  constructor(
    private readonly actionService: ActionService,
    private readonly serviceService: ServiceService,
    private readonly reactionService: ReactionService,
  ) {}

  async cron(): Promise<void> {
    console.log('Discord cron');
  }
}
