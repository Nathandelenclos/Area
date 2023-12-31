import { ApiInvoke, IApiInvokeResponse } from './API/api.invoke';
import { defaultApiHandler, profileApiHandler } from './API/api.handlers';
import UrlServiceTs from '@services/url.service.ts';

interface Credentials {
  email: string;
  password: string;
  name?: string;
}

interface OAuthCredentials {
  email: string;
  provider: string;
  refreshToken: string;
  providerId: string;
}

class AuthService {
  url = UrlServiceTs.getBaseUrl();

  /**
   * Login
   * @param credentials {email, password}
   * @returns {Promise} {ApiInvokeResponse}
   */
  login(credentials: Credentials): Promise<IApiInvokeResponse> {
    return ApiInvoke({
      endpoint: '/auth/signin',
      method: 'POST',
      expectedStatus: 200,
      body: JSON.stringify(credentials),
      handlers: defaultApiHandler,
    });
  }

  /**
   * OAuth Login (Google, Facebook, etc)
   * @param credentials {OAuthCredentials}
   * @constructor {Promise<IApiInvokeResponse>}
   */
  OAuthLogin(credentials: OAuthCredentials): Promise<IApiInvokeResponse> {
    return ApiInvoke({
      endpoint: '/auth/signoauth',
      method: 'POST',
      expectedStatus: 200,
      body: JSON.stringify(credentials),
      handlers: defaultApiHandler,
    });
  }

  OAuthConnect(
    token: string,
    credentials: OAuthCredentials,
  ): Promise<IApiInvokeResponse> {
    return ApiInvoke({
      endpoint: '/auth/connect-oauth',
      method: 'POST',
      expectedStatus: 200,
      body: JSON.stringify(credentials),
      handlers: defaultApiHandler,
      authToken: token,
    });
  }

  /**
   * Register
   * @param credentials {email, password, fullName}
   * @returns {Promise} {ApiInvokeResponse}
   */
  register(credentials: Credentials): Promise<IApiInvokeResponse> {
    return ApiInvoke({
      endpoint: '/auth/register',
      method: 'POST',
      expectedStatus: 200,
      body: JSON.stringify(credentials),
      handlers: defaultApiHandler,
    });
  }

  /**
   * Forgot password
   * @param token {string}
   * @returns {Promise} {ApiInvokeResponse}
   */
  forgotPasswordToken(token: string): Promise<IApiInvokeResponse> {
    return ApiInvoke({
      endpoint: `/auth/recover-password/${token}`,
      method: 'GET',
      expectedStatus: 200,
      handlers: defaultApiHandler,
    });
  }

  /**
   * Forgot password
   * @returns {Promise} {ApiInvokeResponse}
   */
  forgotPassword(): Promise<IApiInvokeResponse> {
    return ApiInvoke({
      endpoint: '/auth/recover-password',
      method: 'GET',
      expectedStatus: 200,
      handlers: defaultApiHandler,
    });
  }

  /**
   * Change password
   * @param token {string}
   * @param password {password}
   * @returns {Promise} {ApiInvokeResponse}
   */
  changePassword(
    token: string,
    password: { password: string },
  ): Promise<IApiInvokeResponse> {
    return ApiInvoke({
      endpoint: '/auth/reset-password',
      method: 'POST',
      expectedStatus: 200,
      body: JSON.stringify(password),
      handlers: defaultApiHandler,
      authToken: token,
    });
  }

  getProfile(token: string): Promise<IApiInvokeResponse> {
    return ApiInvoke({
      endpoint: '/auth/me',
      method: 'GET',
      expectedStatus: 200,
      handlers: profileApiHandler,
      authToken: token,
    });
  }
}

export default new AuthService();
