import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import MicroServiceInit from '@app/common/micro.service.init';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import { InstagramModule } from './instagram.module';

async function bootstrap() {
  const app = await NestFactory.create(InstagramModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.INSTAGRAM_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
