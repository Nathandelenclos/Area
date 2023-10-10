import { ApiInvoke } from '@services/API/api.invoke';

class ServicesService {
  /**
   * Get all services
   * @param token - User token
   */
  getServices(token: string) {
    return ApiInvoke({
      endpoint: '/services',
      method: 'GET',
      expectedStatus: 200,
      authToken: token,
    });
  }

  /**
   * Get service by id
   * @param token - User token
   * @param serviceId - Service id
   */
  getService(token: string, serviceId: string) {
    return ApiInvoke({
      endpoint: `/services/${serviceId}`,
      method: 'GET',
      expectedStatus: 200,
      authToken: token,
    });
  }

  /**
   * Get service actions
   * @param token - User token
   * @param serviceId - Service id
   */
  getActions(token: string, serviceId: string) {
    return ApiInvoke({
      endpoint: `/services/${serviceId}/actions`,
      method: 'GET',
      expectedStatus: 200,
      authToken: token,
    });
  }

  /**
   * Get service reactions
   * @param token - User token
   * @param serviceId - Service id
   */
  getReactions(token: string, serviceId: string) {
    return ApiInvoke({
      endpoint: `/services/${serviceId}/reactions`,
      method: 'GET',
      expectedStatus: 200,
      authToken: token,
    });
  }
}

export default new ServicesService();
