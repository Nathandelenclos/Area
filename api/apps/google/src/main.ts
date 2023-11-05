import { NestFactory } from '@nestjs/core';
import { GoogleModule } from './google.module';
import { ConfigService } from '@nestjs/config';
import MicroServiceInit from '@app/common/micro.service.init';
import MicroServiceProxy from '@app/common/micro.service.proxy';

async function bootstrap() {
  const app = await NestFactory.create(GoogleModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.GOOGLE_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
