import { IApiInvokeResponse } from './API/api.invoke';
import { Platform } from 'react-native';
import {
  AuthConfiguration,
  authorize,
  AuthorizeResult,
  prefetchConfiguration,
} from 'react-native-app-auth';
import AuthService from '@services/auth.service';
import {
  AccessToken,
  LoginManager,
  LoginResult,
} from 'react-native-fbsdk-next';
import {
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  REDIRECT_URI,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from '@env';

class OAuthService {
  /**
   * Google OAuth
   * @constructor
   * @returns {Promise<IApiInvokeResponse>}
   */
  async GoogleOAuth(): Promise<IApiInvokeResponse> {
    const config: AuthConfiguration = {
      issuer: 'https://accounts.google.com',
      clientId:
        Platform.OS === 'ios' ? GOOGLE_IOS_CLIENT_ID : GOOGLE_ANDROID_CLIENT_ID,
      redirectUrl: REDIRECT_URI,
      scopes: ['openid', 'profile', 'email', 'https://mail.google.com/'],
    };
    const authState: AuthorizeResult = await authorize(config);
    const response: Response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authState.accessToken}`,
    );
    const email = await response.json();
    return AuthService.OAuthLogin({
      email: email.email,
      id: email.sub,
      token: authState.refreshToken,
      provider: 'google',
    });
  }

  /**
   * Facebook OAuth
   * @constructor
   * @returns {Promise<IApiInvokeResponse>}
   */
  async FacebookOAuth(): Promise<IApiInvokeResponse> {
    const result: LoginResult = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data: AccessToken | null = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential: string = data.accessToken;
    const response: Response = await fetch(
      `https://graph.facebook.com/me?access_token=${facebookCredential}&fields=email`,
    );
    const email = await response.json();
    return AuthService.OAuthLogin({
      email: email.email,
      id: email.id,
      token: facebookCredential,
      provider: 'facebook',
    });
  }

  /**
   * Spotify OAuth
   * @constructor
   * @returns {Promise<IApiInvokeResponse>}
   */
  async SpotifyOAuth(): Promise<IApiInvokeResponse> {
    const config: AuthConfiguration = {
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      redirectUrl: REDIRECT_URI,
      scopes: [
        'user-modify-playback-state',
        'user-read-playback-state',
        'user-read-currently-playing',
        'user-read-email',
        'user-read-private',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
    const authState: AuthorizeResult = await authorize(config);
    const response: Response = await fetch(`https://api.spotify.com/v1/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const email = await response.json();
    return AuthService.OAuthLogin({
      email: email.email,
      id: email.id,
      token: authState.refreshToken,
      provider: 'spotify',
    });
  }

  /**
   * Github OAuth
   * @constructor
   * @returns {Promise<IApiInvokeResponse>}
   */
  async GithubOAuth(): Promise<IApiInvokeResponse> {
    const config: AuthConfiguration = {
      redirectUrl: 'areadevepitech://',
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      scopes: ['identity', 'user:email', 'read:user'],
      additionalHeaders: { Accept: 'application/json' },
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint: `https://github.com/settings/connections/applications/${GITHUB_CLIENT_ID}`,
      },
    };
    const result: AuthorizeResult = await authorize(config);
    const response: Response = await fetch(
      'https://api.github.com/user/emails',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${result.accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const email = await response.json();
    return AuthService.OAuthLogin({
      email: result.accessToken,
      id: email[0]?.email,
      token: email[1]?.email,
      provider: 'github',
    });
  }
}

export default new OAuthService();
