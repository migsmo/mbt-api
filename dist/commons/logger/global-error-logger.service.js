"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorLoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston_logger_1 = require("./winston.logger");
let GlobalErrorLoggerService = class GlobalErrorLoggerService {
    logError(error) {
        winston_logger_1.winstonLogger.error({
            message: `Status ${error.status} - ${error.method} ${error.path} - ${error.message}`,
            timestamp: error.timestamp,
            stack: error.stack,
        });
    }
    logInfo(message) {
        winston_logger_1.winstonLogger.info(message);
    }
    logWarn(message) {
        winston_logger_1.winstonLogger.warn(message);
    }
};
exports.GlobalErrorLoggerService = GlobalErrorLoggerService;
exports.GlobalErrorLoggerService = GlobalErrorLoggerService = __decorate([
    (0, common_1.Injectable)()
], GlobalErrorLoggerService);
//# sourceMappingURL=global-error-logger.service.js.map