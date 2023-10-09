import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import MicroServiceInit from '@app/common/micro.service.init';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import { YoutubeModule } from './youtube.module';

async function bootstrap() {
  const app = await NestFactory.create(YoutubeModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.YOUTUBE_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
