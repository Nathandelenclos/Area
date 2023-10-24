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
import { AppletConfigService } from '@app/common/applets/configuration/applet.config.service';

@Injectable()
export class TimerService {
  constructor(
    private readonly actionService: ActionService,
    private readonly serviceService: ServiceService,
    private readonly reactionService: ReactionService,
    private readonly appletConfigService: AppletConfigService,
    private readonly appletService: AppletService,
    private readonly configService: ConfigService,
  ) {}

  cron(): void {
    this.atDate();
    this.atCron();
  }

  /**
   * Check if the date of the applet is passed and execute it
   * @returns {Promise<void>}
   */
  async atDate(): Promise<void> {
    const applets = await this.appletService.findAll(
      {
        service: { name: 'Timer' },
        action: { name: 'At date' },
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
      const dateValue: string | null = applet.applet_configs.find(
        (e) => e.key === 'date',
      )?.value;
      if (!dateValue) continue;

      const date = new Date(
        applet.applet_configs.find((e) => e.key === 'date')?.value,
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

  async atCron(): Promise<void> {
    const applets = await this.appletService.findAll(
      {
        service: { name: 'Timer' },
        action: { name: 'At cron' },
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
      const lastExecConfig = applet.applet_configs.find(
        (e) => e.key === 'lastExec',
      );
      if (!lastExecConfig) continue;
      const lastExec = new Date(lastExecConfig.value);
      const delta = +applet.applet_configs.find((e) => e.key === 'delta').value;

      lastExec.setSeconds(lastExec.getSeconds() + delta);
      if (lastExec.getTime() > now.getTime()) continue;
      await this.appletConfigService.update(lastExecConfig.id, {
        value: new Date().toISOString(),
      });
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
    }
  }
}
