import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MicroServiceUtils, {
  OAuthTokenInfo,
} from '@app/common/micro.service.utils';
import {
  ActionAppletEntity,
  ActionRelations,
  ActionService,
  AppletConfigService,
  OauthEntity,
  OauthService,
} from '@app/common';
import { AES } from 'crypto-js';

@Injectable()
export class SpotifyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly actionService: ActionService,
    private readonly oauthService: OauthService,
    private readonly appletConfigService: AppletConfigService,
  ) {}

  cron(): void {
    Promise.all([this.onPlaybackChange()]);
  }

  /**
   * Get an access token with a refresh token
   * @param refreshToken
   * @returns access token
   */
  async refreshToken(refreshToken: string): Promise<string> {
    const clientId = this.configService.get('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get('SPOTIFY_CLIENT_SECRET');

    const response = await fetch(`https://accounts.spotify.com/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`,
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });
    const data = await response.json();
    return data.access_token;
  }

  /**
   * Get the tokens info from an action applet or an oauth entity
   * @param source The source to get the tokens from
   * @returns The tokens info (id, refresh token, access token, last update)
   */
  getTokensInfo(source: ActionAppletEntity | OauthEntity): OAuthTokenInfo {
    if (source instanceof ActionAppletEntity)
      return MicroServiceUtils.getOAuthTokens(this.configService, source);
    else
      return MicroServiceUtils.getOAuthTokensFromObject(
        this.configService,
        source,
      );
  }

  /**
   * Check if the token is still valid, and refresh it if needed
   * @param source The source to get the tokens from
   * @returns access token (null if not valid)
   */
  async checkTokenValidity(
    source: ActionAppletEntity | OauthEntity,
  ): Promise<string> {
    const { id, refreshToken, lastUpdate, accessToken } =
      this.getTokensInfo(source);
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
   * Trigger when a track change, or play/pause
   */
  async onPlaybackChange(): Promise<void> {
    const action = await this.actionService.findOne(
      {
        key: 'on_playback_change',
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

      const response = await fetch(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      let currentPlaybackState;
      try {
        const data = await response.json();
        currentPlaybackState = data?.is_playing ?? undefined;
      } catch (e) {
        continue;
      }

      if (currentPlaybackState === undefined) continue;
      const { lastPlaybackState } = MicroServiceUtils.getConfigs(actionApplet, [
        'lastPlaybackState',
      ]);
      const lastPlaybackStateValue = lastPlaybackState?.value === 'true';

      if (!lastPlaybackState) {
        await this.appletConfigService.create(actionApplet.id, 'actionApplet', {
          value: currentPlaybackState ? 'true' : 'false',
          key: 'lastPlaybackState',
        });
        continue;
      }

      if (currentPlaybackState !== lastPlaybackStateValue) {
        await this.appletConfigService.update(lastPlaybackState.id, {
          value: currentPlaybackState ? 'true' : 'false',
        });
        console.log('trigger', actionApplet.applet.name);
        MicroServiceUtils.callReactions(
          this.configService,
          actionApplet.applet.reactions,
        );
      }
    }
  }

  /**
   * Resume the playback
   * @param OAuthId The OAuth id
   */
  async resumePlayback(OAuthId: number): Promise<void> {
    const OAuth: OauthEntity = await this.oauthService.findOne({
      id: OAuthId,
    });
    const token = await this.checkTokenValidity(OAuth);
    if (!token) return;

    await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Pause the playback
   * @param OAuthId The OAuth id
   */
  async pausePlayback(OAuthId: number): Promise<void> {
    console.log('pause');
    const OAuth: OauthEntity = await this.oauthService.findOne({
      id: OAuthId,
    });
    const token = await this.checkTokenValidity(OAuth);
    if (!token) return;

    await fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
