import { Injectable } from '@nestjs/common';
import {
  ActionAppletService,
  ActionEntity,
  ActionRelations,
  ActionService,
  AppletConfigEntity,
  AppletConfigService,
  AppletEntity,
  AppletRelations,
  AppletRequiredConfigEntity,
  AppletService as AppletCommonService,
  ForbiddenError,
  ReactionAppletService,
  ReactionRelations,
  ReactionService,
  ValidationError,
} from '@app/common';
import { NewActionApplet } from '@app/common/action-applet/action-applet.dto';
import { NewReactionApplet } from '@app/common/reaction-applet/reaction.applet.dto';

interface NewEventConfig {
  [key: string]: any;
  id: number;
}

interface NewAppletRequest {
  name: string;
  description: string;
  is_active: boolean;
  color: string;
  reactions: NewEventConfig[];
  actions: NewEventConfig[];
}

@Injectable()
export class AppletService {
  constructor(
    private readonly appletCommonService: AppletCommonService,
    private readonly reactionAppletService: ReactionAppletService,
    private readonly actionAppletService: ActionAppletService,
    private readonly configService: AppletConfigService,
    private readonly actionService: ActionService,
    private readonly reactionService: ReactionService,
  ) {}

  /**
   * Get all applets for a user
   * @param userId User id
   */
  async getAllApplets(userId: number) {
    return await this.appletCommonService.findAllByUserId(userId, [
      AppletRelations.USER,
      AppletRelations.ACTIONS,
      AppletRelations.REACTIONS,
      AppletRelations.ACTIONS_CONFIG,
      AppletRelations.ACTION_CONFIG,
      AppletRelations.REACTION_CONFIG,
      AppletRelations.REACTIONS_CONFIG,
      AppletRelations.ACTIONS_CONFIG,
    ]);
  }

  /**
   * Get an applet by id
   * @param id Applet id
   * @param userId User id
   */
  async getAppletById(id: number, userId: number) {
    const applet = await this.appletCommonService.findOne({ id: id }, [
      AppletRelations.USER,
      AppletRelations.ACTIONS,
      AppletRelations.REACTIONS,
      AppletRelations.ACTIONS_CONFIG,
      AppletRelations.REACTIONS_CONFIG,
      AppletRelations.ACTION_CONFIG,
      AppletRelations.REACTION_CONFIG,
    ]);
    if (applet.user.id !== userId)
      throw new ForbiddenError('You are not allowed to access this applet');
    return applet;
  }

  /**
   * Check if the required config is present in the config
   * @param config Applet config
   * @param requiredConfig Required config
   */
  checkRequiredConfig(
    config: { [key: string]: any },
    requiredConfig: AppletRequiredConfigEntity[],
  ) {
    const configMissing = [];
    for (const configItem of requiredConfig) {
      if (!config[configItem.key]) {
        configMissing.push(configItem.key);
      }
    }
    if (configMissing.length > 0) {
      throw new ValidationError(configMissing, 'Missing required config: ');
    }
    return true;
  }

  /**
   * Check if the required config is present in the config
   * @param reactions Reactions
   * @param actions Actions
   */
  requiredConfig(reactions: NewEventConfig[], actions: NewEventConfig[]) {
    return Promise.all([
      Promise.all(
        reactions.map(async (reaction) => {
          const reactions = await this.reactionService.findOne(
            { id: reaction.id },
            [ReactionRelations.REQUIRE_CONFIGS],
          );
          if (!reactions) throw new Error('Reaction not found');
          this.checkRequiredConfig(reaction.config, reactions.config);
          return reactions;
        }),
      ),
      Promise.all<ActionEntity>(
        actions.map(async (action) => {
          const actionEntity = await this.actionService.findOne(
            { id: action.id },
            [ActionRelations.REQUIRE_CONFIG],
          );
          if (!actionEntity) throw new Error('Action not found');
          this.checkRequiredConfig(action.config, actionEntity.config);
          return actionEntity;
        }),
      ),
    ]);
  }

  /**
   * Create config for an applet
   * @param data Config data
   * @param applet AppletEntity
   * @param type Type of applet
   */
  async createConfig(
    data: NewEventConfig[],
    applet: AppletEntity,
    type: 'actionApplet' | 'reactionApplet',
  ) {
    const serviceApplet =
      type === 'actionApplet'
        ? this.actionAppletService
        : this.reactionAppletService;

    await Promise.all<AppletConfigEntity[]>(
      data.map(async (event) => {
        const eventData: NewActionApplet & NewReactionApplet = {
          action: undefined,
          reaction: undefined,
          applet: applet.id,
          [type === 'actionApplet' ? 'action' : 'reaction']: event.id,
        };
        const eventApplet = await serviceApplet.create(eventData);
        return Promise.all<AppletConfigEntity>(
          Object.keys(event.config).map((key) => {
            return this.configService.create(eventApplet.id, type, {
              key: key,
              value: event.config[key],
            });
          }),
        );
      }),
    );
  }

  /**
   * Delete all config for an applet
   * @param applet AppletEntity
   */
  deleteConfig(applet: AppletEntity) {
    return Promise.all([
      ...applet.actions.map(async (action) => {
        if (action.configs.length === 0)
          return this.actionAppletService.delete(action.id);
        await this.configService.deleteMany(action.configs.map((c) => c.id));
        return this.actionAppletService.delete(action.id);
      }),
      ...applet.reactions.map(async (reaction) => {
        if (reaction.configs.length === 0)
          return this.reactionAppletService.delete(reaction.id);
        await this.configService.deleteMany(reaction.configs.map((c) => c.id));
        return this.reactionAppletService.delete(reaction.id);
      }),
    ]);
  }

  /**
   * Create a new applet
   * @param data Applet data
   * @param user UserEntity
   */
  async createApplet(data: NewAppletRequest, user: { id: number }) {
    await this.requiredConfig(data.reactions, data.actions);

    const applet = await this.appletCommonService.create({
      name: data.name,
      description: data.description,
      is_active: data.is_active,
      user: user,
      color: '#000000',
    });

    await this.createConfig(data.actions, applet, 'actionApplet');
    await this.createConfig(data.reactions, applet, 'reactionApplet');

    return this.appletCommonService.findOne({ id: applet.id }, [
      AppletRelations.ACTIONS_CONFIG,
      AppletRelations.REACTION_CONFIG,
      AppletRelations.ACTIONS,
      AppletRelations.REACTIONS,
    ]);
  }

  /**
   * Delete an applet
   * @param id Applet id
   * @param userId User id
   */
  async deleteApplet(id: number, userId: number) {
    const applet = await this.appletCommonService.findOne({ id: id }, [
      AppletRelations.USER,
      AppletRelations.ACTIONS,
      AppletRelations.REACTIONS,
      AppletRelations.ACTIONS_CONFIG,
      AppletRelations.REACTION_CONFIG,
      AppletRelations.REACTIONS_CONFIG,
      AppletRelations.ACTIONS_CONFIG,
    ]);

    if (applet.user.id !== userId) {
      throw new ForbiddenError('You are not allowed to access this applet');
    }

    return this.appletCommonService.delete(id);
  }

  /**
   * Update an applet
   * @param id Applet id
   * @param data Applet data
   * @param userId User id
   */
  async updateApplet(id: number, data: NewAppletRequest, userId: number) {
    const applet = await this.appletCommonService.findOne({ id: id }, [
      AppletRelations.USER,
      AppletRelations.ACTIONS,
      AppletRelations.REACTIONS,
      AppletRelations.ACTIONS_CONFIG,
      AppletRelations.REACTION_CONFIG,
      AppletRelations.REACTIONS_CONFIG,
      AppletRelations.ACTIONS_CONFIG,
    ]);

    if (applet.user.id !== userId) {
      throw new ForbiddenError('You are not allowed to access this applet');
    }
    if (data.name || data.description || data.is_active) {
      await this.appletCommonService.update(id, {
        name: data.name,
        description: data.description,
        is_active: data.is_active,
      });
    }
    await this.requiredConfig(data.reactions, data.actions);
    await this.deleteConfig(applet);
    await this.createConfig(data.actions, applet, 'actionApplet');
    await this.createConfig(data.reactions, applet, 'reactionApplet');

    return this.appletCommonService.findOne({ id: applet.id }, [
      AppletRelations.ACTIONS,
      AppletRelations.REACTIONS,
      AppletRelations.ACTIONS_CONFIG,
      AppletRelations.REACTION_CONFIG,
      AppletRelations.REACTIONS_CONFIG,
      AppletRelations.ACTIONS_CONFIG,
    ]);
  }
}
