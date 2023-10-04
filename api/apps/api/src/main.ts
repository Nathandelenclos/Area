import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService);
  console.info('Starting API on port', appConfig.get('APP_PORT'));
  await app.listen(appConfig.get('APP_PORT'));
}

bootstrap();
