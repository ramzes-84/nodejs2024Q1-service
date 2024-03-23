import { ConsoleLogger, Injectable } from '@nestjs/common';
import { env } from 'node:process';

@Injectable()
export class LoggingService extends ConsoleLogger {
  protected levels = env.LOGGER_LEVEL.split(',');
  constructor() {
    super();
  }
  logToFile() {}
}
