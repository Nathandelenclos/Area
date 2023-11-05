import { Injectable } from '@nestjs/common';
import { OauthEntity, OauthService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import MicroServiceUtils from '@app/common/micro.service.utils';
import { AES } from 'crypto-js';

@Injectable()
export class GoogleService {
  constructor(
    private readonly oauthService: OauthService,
    private readonly configService: ConfigService,
  ) {}

  cron(): void {}

  /**
   * Get an access token with a refresh token
   * @param refreshToken
   * @returns access token
   */
  async refreshToken(refreshToken: string): Promise<string> {
    const clientId = this.configService.get('GCP_ID');
    const clientSecret = this.configService.get('GCP_SECRET');

    const response = await fetch(`https://www.googleapis.com/oauth2/v4/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });
    const data = await response.json();
    return data.access_token;
  }

  /**
   * Send an email
   * @param raw The raw email
   * @param token The access token
   */
  async sendRawEmail(raw: string, token: string): Promise<void> {
    console.log('Sending email');
    const response = await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/messages/send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw,
        }),
      },
    );
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  }

  /**
   * Check if the token is still valid, and refresh it if needed
   * @param source The source to get the tokens from
   * @returns access token (null if not valid)
   */
  async checkTokenValidity(source: OauthEntity): Promise<string> {
    const { id, refreshToken, lastUpdate, accessToken } =
      MicroServiceUtils.getOAuthTokensFromObject(this.configService, source);
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

  async sendEmail(
    OAuthId: number,
    from: string,
    to: string,
    subject: string,
    message: string,
  ): Promise<void> {
    const OAuth: OauthEntity = await this.oauthService.findOne({
      id: OAuthId,
    });

    const token = await this.checkTokenValidity(OAuth);
    if (!token) return;

    console.log(from, to, subject, message);
    const buffer = Buffer.from(
      `From: ${from}\n` +
        `To: ${to}\n` +
        `Subject: ${subject}\n\n` +
        `${message}`,
    )
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
    await this.sendRawEmail(buffer, token);
  }
}
