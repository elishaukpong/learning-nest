import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, //remove values not declared in dto
    transform: true, // makes payload come as instance of dto type
    forbidNonWhitelisted: true //throws error if extra values are given
  }));
  await app.listen(3000);
}
bootstrap();
