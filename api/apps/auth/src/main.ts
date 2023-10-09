import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth.module';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import MicroServiceInit from '@app/common/micro.service.init';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  // Get the environment variables from the ConfigService
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.AUTH_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
