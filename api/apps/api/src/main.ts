import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  const appConfig = app.get(ConfigService);
  await app.listen(appConfig.get('APP_PORT'));
  console.info('Starting API on port', appConfig.get('APP_PORT'));
}

bootstrap();
