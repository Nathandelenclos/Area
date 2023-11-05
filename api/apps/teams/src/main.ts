import { NestFactory } from '@nestjs/core';
import { TeamsModule } from './teams.module';
import { ConfigService } from '@nestjs/config';
import MicroServiceInit from '@app/common/micro.service.init';
import MicroServiceProxy from '@app/common/micro.service.proxy';

async function bootstrap() {
  const app = await NestFactory.create(TeamsModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.TEAMS_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
