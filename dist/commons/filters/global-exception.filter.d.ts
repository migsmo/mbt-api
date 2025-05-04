import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { GlobalErrorLoggerService } from '../logger/global-error-logger.service';
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: GlobalErrorLoggerService);
    catch(exception: unknown, host: ArgumentsHost): void;
}
