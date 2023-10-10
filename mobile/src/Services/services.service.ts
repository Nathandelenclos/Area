import { ApiInvoke } from '@services/API/api.invoke';

class ServicesService {
  getServices(token: string) {
    return ApiInvoke({
      endpoint: '/services',
      method: 'GET',
      expectedStatus: 200,
      authToken: token,
    });
  }

  getService(token: string, serviceId: string) {
    return ApiInvoke({
      endpoint: `/services/${serviceId}`,
      method: 'GET',
      expectedStatus: 200,
      authToken: token,
    });
  }

  getActions(token: string, serviceId: string) {
    return ApiInvoke({
      endpoint: `/services/${serviceId}/actions`,
      method: 'GET',
      expectedStatus: 200,
      authToken: token,
    });
  }

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
