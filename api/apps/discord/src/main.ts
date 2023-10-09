import { NestFactory } from '@nestjs/core';
import { DiscordModule } from './discord.module';
import { ConfigService } from '@nestjs/config';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import MicroServiceInit from '@app/common/micro.service.init';

async function bootstrap() {
  const app = await NestFactory.create(DiscordModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.DISCORD_SERVICE,
  );

  app.startAllMicroservices();
}
bootstrap();
