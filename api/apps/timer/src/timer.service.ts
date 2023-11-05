import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ActionAppletService,
  ActionRelations,
  ActionService,
  AppletConfigService,
  AppletService,
  MicroServiceInit,
  ReactionAppletEntity,
  ReactionAppletService,
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
    private readonly actionAppletService: ActionAppletService,
    private readonly reactionAppletService: ReactionAppletService,
  ) {}

  cron(): void {
    this.atDate();
    this.atCron();
  }

  callReactions(reactions: ReactionAppletEntity[]) {
    for (const reaction of reactions) {
      MicroServiceInit.getMicroservice(
        this.configService,
        reaction.reaction.service.rmq_queue,
      ).emit(
        reaction.reaction.cmd,
        reaction.configs.reduce((acc, cur) => {
          acc[cur.key] = cur.value;
          return acc;
        }, {}),
      );
    }
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
        ActionRelations.USER,
        ActionRelations.ACTION_SERVICE,
        ActionRelations.REACTION_SERVICE,
        ActionRelations.REACTIONS_CONFIG,
        ActionRelations.ACTION_CONFIG,
      ],
    );
    if (!action || !action.is_available) return;

    const now = new Date();
    for (const actionApplet of action.applets) {
      if (!actionApplet.applet.is_active) continue;
      const dateConfig = actionApplet.configs.find((e) => e.key === 'date');
      const isActive = actionApplet.configs.find((e) => e.key === 'is_active');
      const isActiveValue: boolean | undefined =
        isActive === undefined ? undefined : isActive?.value === 'true';
      if (!dateConfig || isActiveValue === false) continue;
      const date = new Date(dateConfig.value);
      date.setHours(date.getHours() - 1);

      console.log(
        date.toLocaleDateString(), " : ", date.toLocaleTimeString(), "\n",
        now.toLocaleDateString(), " : ", now.toLocaleTimeString()
    );
      if (date.getTime() > now.getTime()) continue;
      await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
        value: 'false',
        key: 'is_active',
      });
      this.callReactions(actionApplet.applet.reactions);
    }
  }

  /**
   * Check if the cron of the applet is passed and execute it
   */
  async atCron(): Promise<void> {
    const action = await this.actionService.findOne(
      {
        key: 'at_cron',
      },
      [
        ActionRelations.APPLET,
        ActionRelations.APPLETS,
        ActionRelations.CONFIGS,
        ActionRelations.USER,
        ActionRelations.ACTION_SERVICE,
        ActionRelations.REACTION_SERVICE,
        ActionRelations.REACTIONS_CONFIG,
        ActionRelations.ACTION_CONFIG,
      ],
    );
    if (!action || !action.is_available) return;

    const now = new Date();
    for (const actionApplet of action.applets) {
      if (!actionApplet.applet.is_active) continue;
      const lastExecConfig = actionApplet.configs.find(
        (e) => e.key === 'last_exec',
      );
      if (!lastExecConfig) continue;
      const dateExec = new Date(lastExecConfig.value);
      const delta = +actionApplet.configs.find((e) => e.key === 'delta').value;
      dateExec.setSeconds(dateExec.getSeconds() + delta);
      if (dateExec.getTime() > now.getTime()) continue;
      await this.appletConfigService.update(lastExecConfig.id, {
        value: new Date().toISOString(),
      });
      this.callReactions(actionApplet.applet.reactions);
    }
  }
}
