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

  /**
   * Register a new user
   * @param name
   * @param email
   * @param provider
   * @param token
   */
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

  /**
   * Login a user
   * @param email
   * @param password
   */
  static login(email: string, password: string) {
    return ApiInvoke({
      endpoint: `/auth/signin`,
      method: "POST",
      body: JSON.stringify({ email, password }),
      expectedStatus: 200,
    });
  }

  /**
   * Login a user
   * @param email
   * @param provider
   * @param token
   */
  static loginOAuth(email: string, provider: string, token: string) {
    return ApiInvoke({
      endpoint: `/auth/signin-oauth`,
      method: "POST",
      body: JSON.stringify({ email, provider, token }),
      expectedStatus: 200,
    });
  }

  /**
   * Store the token in the local storage
   */
  static storeToken(token: string) {
    localStorage.setItem("accessToken", token);
  }
}
