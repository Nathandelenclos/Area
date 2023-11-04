import { NestFactory } from '@nestjs/core';
import { AppletModule } from './applet.module';
import { ConfigService } from '@nestjs/config';
import { MicroServiceInit, MicroServiceProxy } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppletModule);

  // Get the environment variables from the ConfigService
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.APPLET_SERVICE,
  );

  app.startAllMicroservices();
}
bootstrap();
