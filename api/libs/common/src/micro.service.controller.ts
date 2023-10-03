import { Controller } from '@nestjs/common';
import { Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
class MicroServiceController {
  /**
   * Acknowledge the message received in a microservice from RabbitMQ
   * @param context RmqContext
   * @returns any the data received in the message
   */
  ack(@Ctx() context: RmqContext): any {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    const data = JSON.parse(message.content.toString());

    channel.ack(message);
    return data.data;
  }
}

export default MicroServiceController;
