import { TransformableInfo } from 'logform';
import * as path from 'path';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors } = format;

const dateStr = new Date().toISOString().split('T')[0];

const isServerless = process.env.NODE_ENV === 'production';

interface LogInfo extends TransformableInfo {
  stack?: string;
  message: string;
  timestamp: string;
}

const logFormat = printf(({ message, timestamp, stack }: LogInfo) => {
  return `[${timestamp}]: ${message || ''}.\n ${stack}`;
});
export const winstonLogger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // logs stack trace
    logFormat,
  ),

  transports: [
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),
    ...(!isServerless
      ? [
          new transports.File({
            filename: path.join(__dirname, `../../../logs/${dateStr}.log`),
          }),
        ]
      : []),
  ],
});
