import { Injectable } from '@nestjs/common';
import { ActionService } from '@app/common/actions/action.service';
import { ServiceService } from '@app/common/services/service.service';
import { ReactionService } from '@app/common/reactions/reaction.service';
import {
  AppletRelations,
  AppletService,
} from '@app/common/applets/applet.service';
import MicroServiceInit from '@app/common/micro.service.init';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TimerService {
  constructor(
    private readonly actionService: ActionService,
    private readonly serviceService: ServiceService,
    private readonly reactionService: ReactionService,
    private readonly appletService: AppletService,
    private readonly configService: ConfigService,
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
        AppletRelations.REACTION_SERVICE,
      ],
    );

    if (!applets) return;
    const now = new Date();

    for (const applet of applets) {
      const date = new Date(
        applet.applet_configs.find((e) => e.key === 'date').value,
      );

      if (date.getTime() > now.getTime()) continue;

      this.appletService.delete(applet.id, applet.user.id).then(async () => {
        MicroServiceInit.getMicroservice(
          this.configService,
          applet.reaction.service.rmq_queue,
        ).emit(
          applet.reaction.cmd,
          applet.applet_configs.reduce((acc, cur) => {
            acc[cur.key] = cur.value;
            return acc;
          }, {}),
        );
      });
      console.log('[TIMER SERVICE]: Applet deleted [id: ' + applet.id + ']');
    }
  }
}
