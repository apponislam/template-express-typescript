import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
// const { createLogger, format, transports } = require('winston');
import { createLogger, format, transports } from 'winston';
import { TransformableInfo } from 'logform';
const { combine, timestamp, label, printf } = format;

// const myFormat = printf(
//   ({
//     level,
//     message,
//     label,
//     timestamp,
//   }: {
//     level: string;
//     message: string;
//     label: string;
//     timestamp: Date;
//   }) => {
//     const date = new Date(timestamp);
//     const hour = date.getHours();
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();

//     return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
//   }
// );

const myFormat = printf(
  (info: TransformableInfo & { label?: string; timestamp?: string }) => {
    const { level, message, label, timestamp } = info;

    // timestamp may be string or undefined
    const date = timestamp ? new Date(timestamp) : new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const logLabel = label ?? 'default';

    return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${logLabel}] ${level}: ${message}`;
  }
);

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'SERVER-NAME' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'winston',
        'success',
        '%DATE%-success.log'
      ),
      datePattern: 'DD-MM-YYYY-HH',
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'SERVER-NAME' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'winston',
        'error',
        '%DATE%-error.log'
      ),
      datePattern: 'DD-MM-YYYY-HH',
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
});

export { errorLogger, logger };
