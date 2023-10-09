import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService);
  await app.listen(appConfig.get('API_PORT'));
  console.info('Starting API on port', appConfig.get('API_PORT'));
}

bootstrap();
