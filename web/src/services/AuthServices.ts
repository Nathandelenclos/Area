import { ApiInvoke } from "@src/services/api/api.invoke";

export class AuthServices {
  /**
   * Register a new user
   * @param name - the name of the user
   * @param email - the email of the user
   * @param password - the password of the user
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
   * @param name - the name of the user
   * @param email - the email of the user
   * @param provider - the provider of the user
   * @param token - the token of the user
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
   * @param email - the email of the user
   * @param password - the password of the user
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
   * @param email - the email of the user
   * @param provider - the provider of the user
   * @param token - the token of the user
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
  static me(token: string) {
    return ApiInvoke({
      endpoint: `/auth/me`,
      method: "GET",
      expectedStatus: 200,
      authToken: token,
    });
  }

  /**
   * Store the token in the local storage
   * @param token the token to store
   * @param newPassword the new password
   */
  static changePassword(token: string, newPassword: string) {
    return ApiInvoke({
      endpoint: `/auth/reset-password`,
      method: "POST",
      expectedStatus: 200,
      body: JSON.stringify({ password: newPassword }),
      authToken: token,
    });
  }

  /**
   * Store the token in the local storage
   * @param token the token to store
   */
  static storeToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  /**
   * Disconnect OAuth
   * @constructor {token: string, id: number}
   * @returns {Promise<IApiInvokeResponse>}
   */
  static logout(token: string, id: number) {
    return ApiInvoke({
      endpoint: `/auth/delete-oauth/${id}`,
      method: "DELETE",
      expectedStatus: 200,
      authToken: token,
    });
  }
}
