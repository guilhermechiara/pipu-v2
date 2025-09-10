import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExceptionFilter } from "@app/common/filters/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ExceptionFilter());
  app.enableCors({
    origin: ["http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  });

  await app.listen(3000);
}
bootstrap();
