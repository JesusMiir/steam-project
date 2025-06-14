import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://steam-clone-jesus.s3-website.eu-central-1.amazonaws.com',
    credentials: true, // solo si usas cookies o headers con auth
  });

  await app.listen(80);
}
bootstrap();