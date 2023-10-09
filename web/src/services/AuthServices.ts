import { ApiInvoke } from "@src/services/api/api.invoke";

export class AuthServices {
  static register(name: string, email: string, password: string) {
    return ApiInvoke({
      endpoint: `/auth/register`,
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      expectedStatus: 200,
    });
  }
}
