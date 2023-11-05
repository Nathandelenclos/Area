import { NestFactory } from '@nestjs/core';
import { FacebookModule } from './facebook.module';
import { ConfigService } from '@nestjs/config';
import MicroServiceInit from '@app/common/micro.service.init';
import MicroServiceProxy from '@app/common/micro.service.proxy';

async function bootstrap() {
  const app = await NestFactory.create(FacebookModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.FACEBOOK_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
