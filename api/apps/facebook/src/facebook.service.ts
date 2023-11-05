import { Injectable } from '@nestjs/common';
import {
  ActionAppletEntity,
  ActionRelations,
  ActionService,
  AppletConfigService,
  OauthService,
} from '@app/common';
import { AES } from 'crypto-js';
import MicroServiceUtils from '@app/common/micro.service.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookService {
  constructor(
    private readonly configService: ConfigService,
    private readonly oauthService: OauthService,
    private readonly actionService: ActionService,
    private readonly appletConfigService: AppletConfigService,
  ) {}

  cron(): void {
    Promise.all([this.onPost()]);
  }

  /**
   * Get an access token with a refresh token
   * @param refreshToken
   * @returns access token
   */
  async refreshToken(refreshToken: string): Promise<string> {
    const clientId = this.configService.get('FACEBOOK_APP_ID');
    const clientSecret = this.configService.get('FACEBOOK_APP_SECRET');

    const response = await fetch(
      `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${clientId}&client_secret=${clientSecret}&set_token_expires_in_60_days=true&fb_exchange_token=${refreshToken}`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();
    return data.access_token;
  }

  /**
   * Check if the token is still valid, and refresh it if needed
   * @param source The source to get the tokens from
   * @returns access token (null if not valid)
   */
  async checkTokenValidity(source: ActionAppletEntity): Promise<string> {
    const { id, refreshToken, lastUpdate, accessToken } =
      MicroServiceUtils.getOAuthTokens(this.configService, source);
    if (!refreshToken) return null;

    let token = accessToken;
    if (
      !accessToken ||
      !lastUpdate ||
      lastUpdate.getTime() + 1800000 < Date.now()
    ) {
      token = await this.refreshToken(refreshToken);

      await this.oauthService.update(id, {
        lastUpdate: new Date(),
        accessToken: AES.encrypt(
          token,
          this.configService.get('AES_SECRET'),
        ).toString(),
      });
    }

    return token;
  }

  /**
   * Get the user id from the token
   * @param token The token to get the user id from
   * @returns The user id
   */
  async getUserId(token: string): Promise<string> {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me?fields=id&access_token=${token}`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    console.log(data);
    return data.id;
  }

  /**
   * Trigger on new post
   */
  async onPost(): Promise<void> {
    console.log('onPost', new Date());
    const action = await this.actionService.findOne(
      {
        key: 'on_post',
      },
      [
        ActionRelations.APPLET,
        ActionRelations.APPLETS,
        ActionRelations.CONFIGS,
        ActionRelations.USER,
        ActionRelations.USER_OAUTH,
        ActionRelations.ACTION_SERVICE,
        ActionRelations.REACTION_SERVICE,
        ActionRelations.REACTIONS_CONFIG,
        ActionRelations.ACTION_CONFIG,
      ],
    );
    if (!action || !action.is_available) return;
    for (const actionApplet of action.applets) {
      if (!actionApplet.applet.is_active) continue;

      const token = await this.checkTokenValidity(actionApplet);
      if (!token) continue;

      const userId = await this.getUserId(token);
      if (!userId) continue;

      const response = await fetch(
        `https://graph.facebook.com/v18.0/${userId}/posts?access_token=${token}`,
        {
          method: 'GET',
        },
      );
      const data = await response.json();

      let totalPosts = data.data.length;
      let limit = 1000;

      let nextToken = data.paging.next;

      while (limit > 0) {
        let data;
        try {
          const response = await fetch(nextToken, {
            method: 'GET',
          });
          data = await response.json();
        } catch (e) {
          break;
        }
        if (!data || data.data.length === 0) break;

        totalPosts += data.data.length;
        nextToken = data.paging.next;
        limit--;
      }

      const { lastPostCount } = MicroServiceUtils.getConfigs(actionApplet, [
        'lastPostCount',
      ]);
      const lastPostCountValue = +lastPostCount?.value;

      if (!lastPostCount) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: totalPosts.toString(),
          key: 'lastPostCount',
        });
        continue;
      }

      if (lastPostCountValue === totalPosts) continue;

      await this.appletConfigService.update(lastPostCount.id, {
        value: totalPosts.toString(),
      });
      MicroServiceUtils.callReactions(
        this.configService,
        actionApplet.applet.reactions,
      );
    }
  }
}
