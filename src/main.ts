import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'node:process';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(env.PORT || 4000);
}
bootstrap();
