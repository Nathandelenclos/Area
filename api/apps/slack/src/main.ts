import { NestFactory } from '@nestjs/core';
import { SlackModule } from './slack.module';

async function bootstrap() {
  const app = await NestFactory.create(SlackModule);
  await app.listen(3000);
}
bootstrap();
