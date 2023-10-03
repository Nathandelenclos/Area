import { authorize } from 'react-native-app-auth';
import { Platform } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { env } from '@src/env';

async function signInWithGoogle() {
  const IOSconfig = {
    issuer: 'https://accounts.google.com',
    clientId: env.GOOGLE_IOS_CLIENT_ID,
    redirectUrl: env.REDIRECT_URI,
    scopes: ['openid', 'profile'],
  };

  const Androidconfig = {
    issuer: 'https://accounts.google.com',
    clientId: env.GOOGLE_ANDROID_CLIENT_ID,
    redirectUrl: env.REDIRECT_URI,
    scopes: ['openid', 'profile'],
  };

  const authState = await authorize(
    Platform.OS === 'ios' ? IOSconfig : Androidconfig,
  );

  console.log('Google: ', authState);
  return;
}

async function signInWithFacebook() {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  const data = await AccessToken.getCurrentAccessToken();

  //Once signed in, get the users AccesToken
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = data.accessToken;

  console.log('facebook: ', facebookCredential);
}

async function signInWithGithub() {
  const config = {
    redirectUrl: 'areadevepitech://',
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    scopes: ['identity'],
    additionalHeaders: { Accept: 'application/json' },
    serviceConfiguration: {
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      revocationEndpoint: `https://github.com/settings/connections/applications/${env.GITHUB_CLIENT_ID}`,
    },
  };

  const result = await authorize(config);

  console.log('Github: ', result);
}

async function signInWithSpotify() {
  const config = {
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUrl: env.REDIRECT_URI,
    scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };

  const authState = await authorize(config);

  console.log('Spotify: ', authState);
}

export {
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  signInWithSpotify,
};
