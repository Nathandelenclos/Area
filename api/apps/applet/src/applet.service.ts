import { Injectable } from '@nestjs/common';
import {
  ActionAppletService,
  ActionEntity,
  ActionRelations,
  ActionService,
  AppletConfigEntity,
  AppletConfigService,
  AppletRelations,
  AppletRequiredConfigEntity,
  AppletService as AppletCommonService,
  ReactionAppletService,
  ReactionEntity,
  ReactionRelations,
  ReactionService,
  ValidationError,
  ForbiddenError,
} from '@app/common';

interface NewAppletRequest {
  name: string;
  description: string;
  is_active: boolean;
  reactions: {
    id: number;
    config: {
      [key: string]: any;
    };
  }[];
  actions: {
    id: number;
    config: {
      [key: string]: any;
    };
  }[];
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
      AppletRelations.REACTION_CONFIG,
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
      if (!config[configItem.name]) {
        configMissing.push(configItem.name);
      }
    }
    if (configMissing.length > 0) {
      throw new ValidationError(configMissing, 'Missing required config: ');
    }
    return true;
  }

  /**
   * Create a new applet
   * @param data Applet data
   * @param user UserEntity
   */
  async createApplet(data: NewAppletRequest, user: { id: number }) {
    await Promise.all<ActionEntity>(
      data.actions.map(async (action) => {
        const actionEntity = await this.actionService.findOne(
          { id: action.id },
          [ActionRelations.REQUIRE_CONFIG],
        );
        if (!actionEntity) throw new Error('Action not found');
        this.checkRequiredConfig(action.config, actionEntity.config);
        return actionEntity;
      }),
    );

    await Promise.all<ReactionEntity>(
      data.reactions.map(async (reaction) => {
        const reactions = await this.reactionService.findOne(
          { id: reaction.id },
          [ReactionRelations.REQUIRE_CONFIGS],
        );
        if (!reactions) throw new Error('Reaction not found');
        this.checkRequiredConfig(reaction.config, reactions.config);
        return reactions;
      }),
    );

    const applet = await this.appletCommonService.create({
      name: data.name,
      description: data.description,
      is_active: data.is_active,
      user: user,
    });

    await Promise.all<AppletConfigEntity[]>(
      data.actions.map(async (action) => {
        const actionApplet = await this.actionAppletService.create({
          action: action.id,
          applet: applet.id,
        });
        return Promise.all<AppletConfigEntity>(
          Object.keys(action.config).map((key) => {
            return this.configService.create(actionApplet.id, 'actionApplet', {
              key: key,
              value: action.config[key],
            });
          }),
        );
      }),
    );
    await Promise.all<AppletConfigEntity[]>(
      data.reactions.map(async (reaction) => {
        const actionApplet = await this.reactionAppletService.create({
          reaction: reaction.id,
          applet: applet.id,
        });
        return Promise.all<AppletConfigEntity>(
          Object.keys(reaction.config).map((key) => {
            return this.configService.create(
              actionApplet.id,
              'reactionApplet',
              {
                key: key,
                value: reaction.config[key],
              },
            );
          }),
        );
      }),
    );
    return this.appletCommonService.findOne({ id: applet.id }, [
      AppletRelations.ACTIONS_CONFIG,
      AppletRelations.REACTION_CONFIG,
      AppletRelations.ACTIONS,
      AppletRelations.REACTIONS,
      AppletRelations.USER,
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
    ]);

    if (applet.user.id !== userId) {
      throw new ForbiddenError('You are not allowed to access this applet');
    }

    await Promise.all([
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
    ]);

    if (applet.user.id !== userId) {
      throw new ForbiddenError('You are not allowed to access this applet');
    }

    return this.appletCommonService.update(id, {
      name: data.name,
      description: data.description,
      is_active: data.is_active,
    });
  }
}
