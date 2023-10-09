import { ApiInvoke } from "@services/api/api.invoke";

export default class AppletServices {
  create(applet: AppletObjectDto) {
    return ApiInvoke({
      endpoint: "/applets",
      method: "POST",
      body: JSON.stringify(applet),
      expectedStatus: 200,
    });
  }

  getApplets() {}
}
