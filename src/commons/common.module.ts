import { Module } from '@nestjs/common';
import { GlobalErrorLoggerService } from './logger/global-error-logger.service';

@Module({
  providers: [GlobalErrorLoggerService],
  exports: [GlobalErrorLoggerService],
})
export class CommonModule {}
