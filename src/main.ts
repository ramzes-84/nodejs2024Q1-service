import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'node:process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(env.PORT || 4000);
}
bootstrap();
