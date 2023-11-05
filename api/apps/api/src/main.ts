import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  const appConfig = app.get(ConfigService);
  await app.listen(appConfig.get('API_PORT'), '0.0.0.0');
  console.info('Starting API on port', appConfig.get('API_PORT'));
}

bootstrap();
