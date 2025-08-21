import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExceptionFilter } from "./common/filters/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ExceptionFilter());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
