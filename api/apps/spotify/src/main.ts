import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import MicroServiceInit from '@app/common/micro.service.init';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import { SpotifyModule } from './spotify.module';

async function bootstrap() {
  const app = await NestFactory.create(SpotifyModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.SPOTIFY_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
