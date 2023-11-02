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

  static getAreaOfServiceById(
    authToken: string,
    id: number,
    type: "actions" | "reactions",
  ) {
    return ApiInvoke({
      endpoint: `/services/${id}/${type}`,
      method: "GET",
      expectedStatus: 200,
      authToken,
    });
  }
}
