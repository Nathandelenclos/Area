import { ApiInvoke } from "@services/api/api.invoke";
import AppletObject, { AppletObjectDto } from "@src/objects/AppletObject";

export default class AppletServices {
  static create(applet: AppletObjectDto) {
    return ApiInvoke({
      endpoint: "/applets",
      method: "POST",
      body: JSON.stringify(applet),
      expectedStatus: 200,
    });
  }

  static getApplets(authToken: string) {
    const applets: any = ApiInvoke({
      endpoint: "/auth/me",
      method: "GET",
      expectedStatus: 200,
      authToken: authToken,
    });
    console.log(applets);
    return applets.map((applet: AppletObjectDto) => new AppletObject(applet));
  }

  static delete(id: number, authToken: string) {
    return ApiInvoke({
      endpoint: `/applets/${id}`,
      method: "DELETE",
      expectedStatus: 200,
      authToken: authToken,
    });
  }
}
