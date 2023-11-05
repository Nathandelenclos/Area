import { ApiInvoke } from "@src/services/api/api.invoke";

export class AuthServices {
  /**
   * Register a new user
   * @param name
   * @param email
   * @param password
   */
  static register(name: string, email: string, password: string) {
    return ApiInvoke({
      endpoint: `/auth/register`,
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      expectedStatus: 200,
    });
  }

  static registerOAuth(
    name: string,
    email: string,
    provider: string,
    token: string,
  ) {
    return ApiInvoke({
      endpoint: `/auth/register-oauth`,
      method: "POST",
      body: JSON.stringify({ name, email, provider, token }),
      expectedStatus: 200,
    });
  }

  static login(email: string, password: string) {
    return ApiInvoke({
      endpoint: `/auth/signin`,
      method: "POST",
      body: JSON.stringify({ email, password }),
      expectedStatus: 200,
    });
  }

  static loginOAuth(email: string, provider: string, token: string) {
    return ApiInvoke({
      endpoint: `/auth/signin-oauth`,
      method: "POST",
      body: JSON.stringify({ email, provider, token }),
      expectedStatus: 200,
    });
  }

  static me(token: string) {
    return ApiInvoke({
      endpoint: `/auth/me`,
      method: "GET",
      expectedStatus: 200,
      authToken: token,
    });
  }

  static changePassword(token: string, newPassword: string) {
    return ApiInvoke({
      endpoint: `/auth/reset-password`,
      method: "POST",
      expectedStatus: 200,
      body: JSON.stringify({ password: newPassword }),
      authToken: token,
    });
  }

  static storeToken(token: string) {
    localStorage.setItem("accessToken", token);
  }
}
