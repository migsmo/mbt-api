import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './commons/filters/global-exception.filter';
import { GlobalErrorLoggerService } from './commons/logger/global-error-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const loggerService = app.get(GlobalErrorLoggerService);
  app.useGlobalFilters(new GlobalExceptionFilter(loggerService));

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  console.log('CORS_ORIGIN', process.env.CORS_ORIGIN);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
