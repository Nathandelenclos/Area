import { Injectable } from '@nestjs/common';
import { ActionService } from '@app/common/actions/action.service';
import { ServiceService } from '@app/common/services/service.service';
import {
  ReactionRelations,
  ReactionService,
} from '@app/common/reactions/reaction.service';
import {
  AppletRelations,
  AppletService,
} from '@app/common/applets/applet.service';
import { ReactionHandler } from '@app/common/reaction.handler';

@Injectable()
export class TimerService {
  constructor(
    private readonly actionService: ActionService,
    private readonly serviceService: ServiceService,
    private readonly reactionService: ReactionService,
    private readonly appletService: AppletService,
  ) {}

  cron(): Promise<void> {
    return this.atDate();
  }

  /**
   * Config:
   *
   * date: Date();
   */
  async atDate(): Promise<void> {
    const applets = await this.appletService.findAll(
      {
        service: { name: 'Timer' },
      },
      [
        AppletRelations.CONFIG,
        AppletRelations.SERVICE,
        AppletRelations.ACTION,
        AppletRelations.REACTIONS,
        AppletRelations.USER,
      ],
    );

    if (!applets) return;

    const now = new Date();
    console.log(now);
    for (const applet of applets) {
      const reaction = await this.reactionService.findOne(
        { id: applet.reaction.id },
        [ReactionRelations.SERVICE],
      );
      const date = new Date(
        applet.applet_configs.find((e) => e.key === 'date').value,
      );

      ReactionHandler(
        reaction.service.name,
        reaction.cmd,
        applet.applet_configs,
      );
      if (date.getTime() > now.getTime()) continue;
      this.appletService.delete(applet.id, applet.user.id).then(() => {
        console.log('[TIMER SERVICE]: Applet deleted [id: ' + applet.id + ']');
      });
    }
  }
}
