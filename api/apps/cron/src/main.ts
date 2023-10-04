import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CronModule } from './cron.module';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import MicroServiceInit from '@app/common/micro.service.init';

async function bootstrap() {
  const app = await NestFactory.create(CronModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.CRON_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
