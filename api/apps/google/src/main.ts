import { NestFactory } from '@nestjs/core';
import { GoogleModule } from './google.module';

async function bootstrap() {
  const app = await NestFactory.create(GoogleModule);
  await app.listen(3000);
}
bootstrap();
