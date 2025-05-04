import { Injectable } from '@nestjs/common';
import { winstonLogger } from './winston.logger';

@Injectable()
export class GlobalErrorLoggerService {
  logError(error: {
    timestamp: string;
    path: string;
    method: string;
    status: number;
    message: any;
    stack?: string;
  }) {
    winstonLogger.error({
      message: `Status ${error.status} - ${error.method} ${error.path} - ${error.message}`,
      timestamp: error.timestamp,
      stack: error.stack,
    });
  }

  logInfo(message: string) {
    winstonLogger.info(message);
  }

  logWarn(message: string) {
    winstonLogger.warn(message);
  }
}
