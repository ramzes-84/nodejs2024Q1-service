import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { env } from 'node:process';
import { appendFileSync } from 'node:fs';
import { resolve } from 'node:path';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private levels: string[];
  private fileSize: number;

  constructor() {
    super();
    this.levels = env.LOGGER_LEVEL.split(',');
    this.fileSize = +env.LOGGER_FILE_SIZE;
  }

  // log(msg: string) {
  //   super.log(msg);
  //   this.logToFile(msg);
  // }

  logToFile(line: string) {
    const path = resolve(__dirname, '../../log.txt');
    appendFileSync(path, line);
  }
}
