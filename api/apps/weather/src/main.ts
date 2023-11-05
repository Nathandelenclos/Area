import { NestFactory } from '@nestjs/core';
import { WeatherModule } from './weather.module';
import { ConfigService } from '@nestjs/config';
import MicroServiceInit from '@app/common/micro.service.init';
import MicroServiceProxy from '@app/common/micro.service.proxy';

async function bootstrap() {
  const app = await NestFactory.create(WeatherModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.WEATHER_SERVICE,
  );

  app.startAllMicroservices();
}

bootstrap();
