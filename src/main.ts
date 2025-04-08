import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './commons/filters/global-exception.filter';
import { GlobalErrorLoggerService } from './commons/logger/global-error-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Needed for setting httpOnly cookies in auth APIs
  app.use(cookieParser());
  const loggerService = app.get(GlobalErrorLoggerService);
  app.useGlobalFilters(new GlobalExceptionFilter(loggerService));
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
