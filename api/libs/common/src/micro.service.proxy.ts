import MicroServiceResponse from '@app/common/micro.service.response';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

class MicroServiceProxy {
  static microServiceQueue = {
    AUTH_SERVICE: 'auth_queue',
    CRON_SERVICE: 'cron_queue',
    DISCORD_SERVICE: 'discord_queue',
  };

  /**
   * Encapsulates the logic to call a microservice and return the response
   * @param client ClientProxy instance of the microservice
   * @param cmd string the command to call in the microservice
   * @param data any the data to send to the microservice
   * @param res Response the response object to be sent to the client
   */
  static async callMicroService(
    client: ClientProxy,
    cmd: string,
    data: any,
    res: Response,
  ): Promise<void> {
    const response = await new Promise<MicroServiceResponse>((resolve) => {
      client.send({ cmd: cmd }, data).subscribe(
        (response) => {
          resolve(new MicroServiceResponse(response));
        },
        (error) => {
          console.error('error', error);
          resolve(
            new MicroServiceResponse({
              code: HttpStatus.INTERNAL_SERVER_ERROR,
              message: error.message || 'Internal server error',
            }),
          );
        },
      );
    });
    res.status(response.getStatus()).json(response.getJSON());
  }
}

export default MicroServiceProxy;
