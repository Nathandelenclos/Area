import { ApiInvoke } from "@services/api/api.invoke";

/**
 * AreaService
 * @description Get the services from the API
 */
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
