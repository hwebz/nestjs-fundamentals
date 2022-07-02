import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // prevent unwanted key in request body posted to endpoint
      transform: true, // enable auto transform to DTO instance
      transformOptions: {
        enableImplicitConversion: true, // implicitly convert string query to number
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
