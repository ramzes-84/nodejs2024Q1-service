import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { env } from 'node:process';
import { appendFileSync } from 'node:fs';
import { resolve } from 'node:path';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private levels: string[];
  private fileSize: number;
  private path: string;

  constructor() {
    super();
    this.levels = env.LOGGER_LEVEL.split(',');
    this.fileSize = +env.LOGGER_FILE_SIZE;
    this.path = resolve(__dirname, '../../log.txt');
  }

  logToFile(msg: string, type: string, ctx?: string) {
    const logLine = `${new Date().toISOString()} ${ctx ? ctx + ' ' : ''}${type} ${msg}\n`;
    appendFileSync(this.path, logLine);
  }

  log(msg: string, ctx: string = '') {
    if (this.levels.includes('log')) {
      super.log(msg, ctx);
      this.logToFile(msg, 'LOG', ctx);
    }
  }

  error(msg: string, ctx: string = '') {
    if (this.levels.includes('error')) {
      super.error(msg, ctx);
      this.logToFile(msg, 'ERROR');
    }
  }

  warn(msg: string) {
    if (this.levels.includes('warn')) {
      super.warn(msg);
      this.logToFile(msg, 'WARN');
    }
  }

  debug(msg: string) {
    if (this.levels.includes('debug')) {
      super.debug(msg);
      this.logToFile(msg, 'DEBUG');
    }
  }

  verbose(msg: string) {
    if (this.levels.includes('verbose')) {
      super.verbose(msg);
      this.logToFile(msg, 'VERBOSE');
    }
  }
}
