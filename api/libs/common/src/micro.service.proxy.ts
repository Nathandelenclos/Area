import MicroServiceResponse from '@app/common/micro.service.response';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';

class MicroServiceProxy {
  static microServiceQueue = {
    CRON_SERVICE: 'cron_queue',
    AUTH_SERVICE: 'auth_queue',
  };
  /**
   * Encapsulates the logic to call a microservice and return the response
   * @param client ClientProxy instance of the microservice
   * @param cmd string the command to call in the microservice
   * @param data any the data to send to the microservice
   * @param res Response the response object to be sent to the client
   */
  static callMicroService(
    client: ClientProxy,
    cmd: string,
    data: any,
    res: Response,
  ): void {
    client.send({ cmd: cmd }, data).subscribe((response) => {
      const microServiceResponse = new MicroServiceResponse(response);
      res
        .status(microServiceResponse.getStatus())
        .json(microServiceResponse.getJSON());
    });
  }
}

export default MicroServiceProxy;
