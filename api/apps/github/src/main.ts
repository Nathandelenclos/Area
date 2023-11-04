import { NestFactory } from '@nestjs/core';
import { GithubModule } from './github.module';
import { ConfigService } from '@nestjs/config';
import { MicroServiceInit, MicroServiceProxy } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(GithubModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.GITHUB_SERVICE,
  );

  app.startAllMicroservices();
}
bootstrap();
