import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { INestApplication, Provider } from '@nestjs/common';
import MicroServiceProxy from '@app/common/micro.service.proxy';

class MicroServiceInit {
  public static init(provideName: string, queue: string): Provider {
    return {
      provide: provideName,
      useFactory: (configService: ConfigService) => {
        const USER = configService.get('RABBITMQ_USER');
        const PASSWORD = configService.get('RABBITMQ_PASS');
        const HOST = configService.get('RABBITMQ_HOST');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
            queue: queue,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    };
  }

  public static connect(
    app: INestApplication,
    configService: ConfigService,
    queue: string,
  ) {
    const USER = configService.get('RABBITMQ_USER');
    const PASSWORD = configService.get('RABBITMQ_PASS');
    const HOST = configService.get('RABBITMQ_HOST');

    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
        noAck: false,
        queue,
        queueOptions: {
          durable: true,
        },
      },
    });
  }
}

export default MicroServiceInit;
