import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MongoExceptionFilter } from 'utils/mongo-exception';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new MongoExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
