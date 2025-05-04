import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseError } from 'src/errors/base-error';
import { GlobalErrorLoggerService } from '../logger/global-error-logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: GlobalErrorLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const internalMessage =
      exception instanceof BaseError
        ? exception.internalMessage || exception.clientMessage
        : 'Internal server error';
    const clientMessage =
      exception instanceof BaseError
        ? exception.clientMessage
        : 'Internal server error';

    this.logger.logError({
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      status,
      message: internalMessage,
      stack: exception instanceof Error ? exception.stack : undefined,
    });

    response.status(status).json({
      statusCode: status,
      message:
        typeof clientMessage === 'string'
          ? clientMessage
          : 'Something went wrong',
    });
  }
}
