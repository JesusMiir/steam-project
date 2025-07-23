import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const origin = process.env.CORS_ORIGIN || "http://localhost:5173";
  const port = parseInt(process.env.PORT || "3000", 10);

  app.enableCors({
    origin,
    credentials: true, // solo si usas cookies o headers con auth
  });

  await app.listen(port);
  console.log(`✅ Backend running on port ${port} with CORS origin: ${origin}`);
}
bootstrap();
