import { ReactionAppletEntity } from '@app/common/reaction-applet/reaction-applet.entity';
import { ActionAppletEntity, MicroServiceInit } from '@app/common/index';
import { ConfigService } from '@nestjs/config';

class MicroServiceUtils {
  /**
   * Call reactions from an applet
   * @param configService The Nest config service
   * @param reactions The reactions to call
   */
  public static callReactions(
    configService: ConfigService,
    reactions: ReactionAppletEntity[],
  ) {
    for (const reaction of reactions) {
      MicroServiceInit.getMicroservice(
        configService,
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
   * Get configs from an applet
   * @param actionApplet The applet to get configs from
   * @param keys The keys to get
   * @returns The configs
   */
  public static getConfigs(
    actionApplet: ActionAppletEntity,
    keys: string[],
  ): any {
    const configs = {};
    for (const key of keys) {
      const config = actionApplet.configs.find((e) => e.key === key);
      if (!config) continue;
      configs[key] = config;
    }
    return configs;
  }
}

export default MicroServiceUtils;
