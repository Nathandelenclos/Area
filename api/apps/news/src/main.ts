import { NestFactory } from '@nestjs/core';
import { NewsModule } from './news.module';
import { ConfigService } from '@nestjs/config';
import MicroServiceInit from '@app/common/micro.service.init';
import MicroServiceProxy from '@app/common/micro.service.proxy';

async function bootstrap() {
  const app = await NestFactory.create(NewsModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.NEWS_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
