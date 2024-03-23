import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'node:process';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingService } from './Logger/logger.service';

const config = new DocumentBuilder()
  .setTitle('Home Lib')
  .setDescription('The Home Lib API description')
  .setVersion('1.0')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useLogger(new LoggingService());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(env.PORT || 4000);
}
bootstrap();
