import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ActionRelations,
  ActionService,
  AppletConfigService,
  AppletRelations,
  AppletService,
  ReactionService,
  ServiceService,
} from '@app/common';

@Injectable()
export class TimerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly appletService: AppletService,
    private readonly appletConfigService: AppletConfigService,
    private readonly serviceService: ServiceService,
    private readonly actionService: ActionService,
    private readonly reactionService: ReactionService,
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
    const action = await this.actionService.findOne(
      {
        key: 'at_date',
      },
      [
        ActionRelations.APPLET,
        ActionRelations.APPLETS,
        ActionRelations.CONFIGS,
      ],
    );
    if (!action) return;

    const now = new Date();

    for (const applet of action.applets) {
      const dateConfig = applet.configs.find((e) => e.key === 'date');
      console.log(dateConfig);
    }

    // const dateValue: string | null = applet.config.find(
    //   (e) => e.key === 'date',
    //   )?.value;
    //   if (!dateValue) continue;
    //
    //   const date = new Date(
    //     applet.applet_configs.find((e) => e.key === 'date')?.value,
    //   );
    //
    //   if (date.getTime() > now.getTime()) continue;
    //
    //   this.appletService.delete(applet.id, applet.user.id).then(async () => {
    //     MicroServiceInit.getMicroservice(
    //       this.configService,
    //       applet.reaction.service.rmq_queue,
    //     ).emit(
    //       applet.reaction.cmd,
    //       applet.applet_configs.reduce((acc, cur) => {
    //         acc[cur.key] = cur.value;
    //         return acc;
    //       }, {}),
    //     );
    //   });
    //   console.log('[TIMER SERVICE]: Applet deleted [id: ' + applet.id + ']');
    // }
  }

  async atCron(): Promise<void> {
    // const service = await this.serviceService.findOne({ key: 'timer' });
    // if (!service) return;
    // const action = await this.actionService.findOne({ key: 'at_cron' });
    // if (!action) return;
    // const applets = await this.appletService.findAll(
    //   {
    //     service,
    //     action,
    //   },
    //   [AppletRelations.REACTIONS, AppletRelations.USER],
    // );
    //
    // if (!applets) return;
    // const now = new Date();
    //
    // for (const applet of applets) {
    //   const lastExecConfig = applet.applet_configs.find(
    //     (e) => e.key === 'lastExec',
    //   );
    //   if (!lastExecConfig) continue;
    //   const lastExec = new Date(lastExecConfig.value);
    //   const delta = +applet.applet_configs.find((e) => e.key === 'delta').value;
    //
    //   lastExec.setSeconds(lastExec.getSeconds() + delta);
    //   if (lastExec.getTime() > now.getTime()) continue;
    //   await this.appletConfigService.update(lastExecConfig.id, {
    //     value: new Date().toISOString(),
    //   });
    //   MicroServiceInit.getMicroservice(
    //     this.configService,
    //     applet.reaction.service.rmq_queue,
    //   ).emit(
    //     applet.reaction.cmd,
    //     applet.applet_configs.reduce((acc, cur) => {
    //       acc[cur.key] = cur.value;
    //       return acc;
    //     }, {}),
    //   );
    // }
  }
}
