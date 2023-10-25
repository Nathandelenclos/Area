import { NestFactory } from '@nestjs/core';
import { TimerModule } from './timer.module';
import { ConfigService } from '@nestjs/config';
import MicroServiceProxy from '@app/common/micro.service.proxy';
import MicroServiceInit from '@app/common/micro.service.init';

async function bootstrap() {
  const app = await NestFactory.create(TimerModule);
  const configService = app.get(ConfigService);

  MicroServiceInit.connect(
    app,
    configService,
    MicroServiceProxy.microServiceQueue.TIMER_SERVICE,
  );

  app.startAllMicroservices();
}
bootstrap();
