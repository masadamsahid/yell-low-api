import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";

import * as dotenv from 'dotenv';
import { ValidationPipe } from "@nestjs/common";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = parseInt(configService.get('PORT')) || 8000;
  
  await app.listen(port).then(() => {
    console.log(`Server is running on ${port}`)
  });
}

bootstrap();
