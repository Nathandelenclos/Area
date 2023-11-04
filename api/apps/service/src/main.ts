import { NestFactory } from '@nestjs/core';
import { ServiceModule } from './service.module';
import { ConfigService } from '@nestjs/config';
import MicroServiceInit from '@app/common/micro.service.init';
import MicroServiceProxy from '@app/common/micro.service.proxy';

async function bootstrap() {
  const app = await NestFactory.create(ServiceModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.SERVICE_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
