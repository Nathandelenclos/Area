import { ApiInvoke } from "@services/api/api.invoke";

export default class AreaService {
  static getServices() {
    return ApiInvoke({
      endpoint: "/services",
      method: "GET",
      expectedStatus: 200,
    });
  }

  static getAreaOfServiceById(id: number, type: "actions" | "reactions") {
    return ApiInvoke({
      endpoint: `/services/${id}/${type}`,
      method: "GET",
      expectedStatus: 200,
    });
  }
}
