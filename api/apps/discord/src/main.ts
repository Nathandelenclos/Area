import { NestFactory } from '@nestjs/core';
import { DiscordModule } from './discord.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import MicroServiceProxy from '@app/common/micro.service.proxy';

async function bootstrap() {
  const app = await NestFactory.create(DiscordModule);
  const configService = app.get(ConfigService);

  const USER = configService.get('RABBITMQ_USER');
  const PASSWORD = configService.get('RABBITMQ_PASS');
  const HOST = configService.get('RABBITMQ_HOST');

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck: false,
      queue: MicroServiceProxy.microServiceQueue.DISCORD_SERVICE,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();
