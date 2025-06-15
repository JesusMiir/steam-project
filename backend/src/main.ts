import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://www.steam-project.es',
    credentials: true, // solo si usas cookies o headers con auth
  });

  await app.listen(80);
}
bootstrap();