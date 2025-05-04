"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("../../errors/base-error");
const global_error_logger_service_1 = require("../logger/global-error-logger.service");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const internalMessage = exception instanceof base_error_1.BaseError
            ? exception.internalMessage || exception.clientMessage
            : 'Internal server error';
        const clientMessage = exception instanceof base_error_1.BaseError
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
            message: typeof clientMessage === 'string'
                ? clientMessage
                : 'Something went wrong',
        });
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [global_error_logger_service_1.GlobalErrorLoggerService])
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map