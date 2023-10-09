import { ApiInvoke } from "@services/api/api.invoke";

export default class AreaService {
  static getServices(authToken: string) {
    return ApiInvoke({
      endpoint: "/services",
      method: "GET",
      expectedStatus: 200,
      authToken,
    });
  }
}
