import { ApiInvoke } from './API/api.invoke';
import defaultApiHandler from './API/api.handlers';

interface Credentials {
  email: string;
  password: string;
  fullName?: string;
}

class AuthService {
  /**
   * Login
   * @param credentials {email, password}
   * @returns {Promise} {token, user}
   */
  login(credentials: Credentials) {
    return ApiInvoke({
      endpoint: '/login',
      method: 'POST',
      expectedStatus: 200,
      body: JSON.stringify(credentials),
      handlers: defaultApiHandler,
    });
  }

  /**
   * Logout
   * @returns {Promise}
   */
  logout() {
    return ApiInvoke({
      endpoint: '/logout',
      method: 'POST',
      expectedStatus: 200,
      handlers: defaultApiHandler,
    });
  }

  /**
   * Register
   * @param credentials {email, password, fullName}
   * @returns {Promise} {token, user}
   */
  register(credentials: Credentials) {
    return ApiInvoke({
      endpoint: '/register',
      method: 'POST',
      expectedStatus: 200,
      body: JSON.stringify(credentials),
      handlers: defaultApiHandler,
    });
  }

  /**
   * Forgot password
   * @param email {string}
   * @returns {Promise}
   */
  forgotPassword(email: string) {
    return ApiInvoke({
      endpoint: '/forgot-password',
      method: 'POST',
      expectedStatus: 200,
      body: JSON.stringify({ email }),
      handlers: defaultApiHandler,
    });
  }
}

export default new AuthService();
