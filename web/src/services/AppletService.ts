import { ApiInvoke } from "@services/api/api.invoke";
import {
  AppletObject,
  AppletObjectDto,
  NewAppletRequest,
} from "@src/objects/AppletObject";

export default class AppletService {
  static create(applet: NewAppletRequest, authToken: string) {
    console.log("applet", applet);
    return ApiInvoke({
      endpoint: "/applets",
      method: "POST",
      body: JSON.stringify(applet),
      expectedStatus: 200,
      authToken,
    });
  }

  static async getApplets(authToken: string) {
    const applets: any = (
      await ApiInvoke({
        endpoint: "/applets",
        method: "GET",
        expectedStatus: 200,
        authToken,
      })
    )?.data;
    return (
      applets?.map((applet: AppletObjectDto) => new AppletObject(applet)) ?? []
    );
  }

  static delete(id: number, authToken: string) {
    return ApiInvoke({
      endpoint: `/applets/${id}`,
      method: "DELETE",
      expectedStatus: 200,
      authToken,
    });
  }

  static getAppletById(id: number, authToken: string) {
    return ApiInvoke({
      endpoint: `/applets/${id}`,
      method: "GET",
      expectedStatus: 200,
      authToken,
    });
  }
}
