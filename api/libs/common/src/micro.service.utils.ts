import { ReactionAppletEntity } from '@app/common/reaction-applet/reaction-applet.entity';
import {
  ActionAppletEntity,
  MicroServiceInit,
  OauthEntity,
} from '@app/common/index';
import { ConfigService } from '@nestjs/config';
import { AES, enc } from 'crypto-js';

export interface OAuthTokenInfo {
  id?: number;
  accessToken?: string;
  refreshToken?: string;
  lastUpdate?: Date;
}

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

  /**
   * Get OAuth tokens from an applet
   * @param configService The Nest config service
   * @param actionApplet The applet to get OAuth tokens from
   * @returns The OAuth tokens (decrypted)
   */
  public static getOAuthTokens(
    configService: ConfigService,
    actionApplet: ActionAppletEntity | ReactionAppletEntity,
  ): OAuthTokenInfo {
    const oauth_id = actionApplet.configs.find((e) => e.key === 'oauth_id');
    if (!oauth_id) return {};
    const oauth = actionApplet.applet.user.oauth.find(
      (e) => e.id === +oauth_id.value,
    );
    if (!oauth) return {};

    const key = configService.get('AES_SECRET');
    return {
      id: +oauth_id.value,
      accessToken: oauth.accessToken
        ? AES.decrypt(oauth.accessToken, key).toString(enc.Utf8)
        : undefined,
      refreshToken: oauth.refreshToken
        ? AES.decrypt(oauth.refreshToken, key).toString(enc.Utf8)
        : undefined,
      lastUpdate: oauth.lastUpdate,
    };
  }

  public static getOAuthTokensFromObject(
    configService: ConfigService,
    oauth: OauthEntity,
  ): OAuthTokenInfo {
    const key = configService.get('AES_SECRET');
    return {
      id: oauth.id,
      accessToken: oauth.accessToken
        ? AES.decrypt(oauth.accessToken, key).toString(enc.Utf8)
        : undefined,
      refreshToken: oauth.refreshToken
        ? AES.decrypt(oauth.refreshToken, key).toString(enc.Utf8)
        : undefined,
      lastUpdate: oauth.lastUpdate,
    };
  }
}

export default MicroServiceUtils;
