import { ApiInvoke, IApiInvokeResponse } from './API/api.invoke';
import defaultApiHandler from './API/api.handlers';

interface Credentials {
  email: string;
  password: string;
  name?: string;
}

interface OAuthCredentials {
  email: string;
  id: string;
  token: string;
  provider: string;
}

class AuthService {
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
      expectedStatus: 201,
      body: JSON.stringify(credentials),
      handlers: defaultApiHandler,
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
      endpoint: '/auth/recover-password/',
      method: 'GET',
      expectedStatus: 200,
      handlers: defaultApiHandler,
    });
  }

  getProfile(token: string): Promise<IApiInvokeResponse> {
    return ApiInvoke({
      endpoint: '/auth/me',
      method: 'GET',
      expectedStatus: 200,
      handlers: defaultApiHandler,
      authToken: token,
    });
  }
}

export default new AuthService();
