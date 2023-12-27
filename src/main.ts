import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger('APP');
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,      
    })
  )
  app.setGlobalPrefix('api');
  await app.listen(process.env.APP_PORT);
  logger.log(`App running on port ${process.env.APP_PORT}`)  
}
bootstrap();
