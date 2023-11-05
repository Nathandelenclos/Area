import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { IApiInvokeResponse } from '@services/API/api.invoke';
import OauthService from '@services/oauth.service';

type AuthItem = {
  color: string;
  icon: [IconPrefix, IconName];
  OAuth: (arg0: boolean, token: string) => Promise<IApiInvokeResponse>;
  provider: string;
};

const AUTH_LIST: AuthItem[] = [
  {
    icon: ['fab', 'facebook'],
    color: '#3b5998',
    OAuth: (connect, token) => OauthService.FacebookOAuth(connect, token),
    provider: 'facebook',
  },
  {
    icon: ['fab', 'google'],
    color: '#db4437',
    OAuth: (connect, token) => OauthService.GoogleOAuth(connect, token),
    provider: 'google',
  },
  {
    icon: ['fab', 'spotify'],
    color: '#1db954',
    OAuth: (connect, token) => OauthService.SpotifyOAuth(connect, token),
    provider: 'spotify',
  },
  {
    icon: ['fab', 'github'],
    color: '#24292e',
    OAuth: (connect, token) => OauthService.GithubOAuth(connect, token),
    provider: 'github',
  },
];

export { AUTH_LIST };
export type { AuthItem };
