"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = void 0;
const path = require("path");
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize, errors } = winston_1.format;
const dateStr = new Date().toISOString().split('T')[0];
const logFormat = printf(({ message, timestamp, stack }) => {
    return `[${timestamp}]: ${message || ''}.\n ${stack}`;
});
exports.winstonLogger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
    transports: [
        new winston_1.transports.File({
            filename: path.join(__dirname, `../../../logs/${dateStr}.log`),
        }),
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), logFormat),
        }),
    ],
});
//# sourceMappingURL=winston.logger.js.map