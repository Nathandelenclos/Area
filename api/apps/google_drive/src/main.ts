import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import MicroServiceInit from '@app/common/micro.service.init';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import { GoogleDriveModule } from './google_drive.module';

async function bootstrap() {
  const app = await NestFactory.create(GoogleDriveModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.GOOGLE_DRIVE_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
