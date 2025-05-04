"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const global_exception_filter_1 = require("./commons/filters/global-exception.filter");
const global_error_logger_service_1 = require("./commons/logger/global-error-logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    const loggerService = app.get(global_error_logger_service_1.GlobalErrorLoggerService);
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter(loggerService));
    app.enableCors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    });
    console.log('CORS_ORIGIN', process.env.CORS_ORIGIN);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map