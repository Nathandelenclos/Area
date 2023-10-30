import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { INestApplication, Provider } from '@nestjs/common';

class MicroServiceInit {
  /**
   * Get a microservice
   * @param configService
   * @param queue
   */
  public static getMicroservice(configService: ConfigService, queue: string) {
    const USER = configService.get('RABBITMQ_USER');
    const PASSWORD = configService.get('RABBITMQ_PASS');
    const HOST = configService.get('RABBITMQ_HOST');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
        queue: queue,
      },
    });
  }

  /**
   * Initialize a microservice
   * @param provideName The name of the provider
   * @param queue The queue to connect to
   * @returns The provider
   */
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

  /**
   * Connect a microservice to the app
   * @param app The app to connect to
   * @param configService The config service
   * @param queue The queue to connect to
   */
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
