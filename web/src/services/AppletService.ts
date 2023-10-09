import { ApiInvoke } from "@services/api/api.invoke";
import {
  AppletObject,
  AppletObjectDto,
  NewAppletDto,
} from "@src/objects/AppletObject";

export default class AppletService {
  static create(applet: NewAppletDto, authToken: string) {
    console.log("authToken", authToken);
    return ApiInvoke({
      endpoint: "/applets",
      method: "POST",
      body: JSON.stringify(applet),
      expectedStatus: 200,
      authToken,
    });
  }

  static getApplets(authToken: string) {
    const applets: any = ApiInvoke({
      endpoint: "/auth/me",
      method: "GET",
      expectedStatus: 200,
      authToken,
    });
    return applets.map((applet: AppletObjectDto) => new AppletObject(applet));
  }

  static delete(id: number, authToken: string) {
    return ApiInvoke({
      endpoint: `/applets/${id}`,
      method: "DELETE",
      expectedStatus: 200,
      authToken,
    });
  }
}
