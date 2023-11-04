import { ApiInvoke } from "@services/api/api.invoke";
import {
  AppletObject,
  AppletObjectDto,
  NewAppletRequest,
} from "@src/objects/AppletObject";

/**
 * AppletService
 * @description AppletService is the service that is used to call the API
 */
export default class AppletService {
  static create(applet: NewAppletRequest, authToken: string) {
    console.log("authToken", authToken);
    return ApiInvoke({
      endpoint: "/applets",
      method: "POST",
      body: JSON.stringify(applet),
      expectedStatus: 200,
      authToken,
    });
  }

  /**
   * Get all applets
   * @param authToken - The auth token to use
   * @returns - The applets
   */
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

  /**
   * Delete an applet
   * @param id - The applet id
   * @param authToken - The auth token to use
   * @returns - The applet
   */
  static delete(id: number, authToken: string) {
    return ApiInvoke({
      endpoint: `/applets/${id}`,
      method: "DELETE",
      expectedStatus: 200,
      authToken,
    });
  }

  /**
   * Get an applet by id
   * @param id - The applet id
   * @param authToken - The auth token to use
   * @returns - The applet
   */
  static getAppletById(id: number, authToken: string) {
    return ApiInvoke({
      endpoint: `/applets/${id}`,
      method: "GET",
      expectedStatus: 200,
      authToken,
    });
  }
}
