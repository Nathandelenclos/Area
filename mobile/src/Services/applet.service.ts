import { ApiInvoke } from '@services/API/api.invoke';
import { IApplet } from '@interfaces/applet.interface';

class AppletService {
  /**
   * Get all applets
   * @param token - User token
   */
  getMyApplets(token: string) {
    return ApiInvoke({
      endpoint: '/auth/me',
      method: 'GET',
      expectedStatus: 200,
      authToken: token,
    });
  }

  /**
   * Create applet
   * @param token - User token
   * @param data - Applet data
   */
  createApplet(token: string, data: IApplet) {
    return ApiInvoke({
      endpoint: '/applets',
      method: 'POST',
      expectedStatus: 201,
      authToken: token,
      body: JSON.stringify(data),
    });
  }

  /**
   * Update applet
   * @param token - User token
   * @param appletId - Applet id
   */
  getApplet(token: string, appletId: number) {
    return ApiInvoke({
      endpoint: `/applets/${appletId}`,
      method: 'GET',
      expectedStatus: 200,
      authToken: token,
    });
  }

  /**
   * Update applet
   * @param token - User token
   * @param appletId - Applet id
   */
  async deleteApplet(token: string, appletId: number) {
    const data = ApiInvoke({
      endpoint: `/applets/${appletId}`,
      method: 'DELETE',
      expectedStatus: 200,
      authToken: token,
    });
    return data;
  }
}

export default new AppletService();
