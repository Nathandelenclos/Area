import MicroServiceResponse from '@app/common/micro.service.response';
import { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';

class MicroServiceProxy {
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
