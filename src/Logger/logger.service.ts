import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { env } from 'node:process';
import { stat, appendFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { OnEvent } from '@nestjs/event-emitter';

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

  @OnEvent('test.event')
  handleEvent() {
    console.log(`[LoggingService] EVENT has been emitted.`);
  }

  async logToFile(msg: string, type: string, ctx?: string) {
    const { size } = await stat(this.path);
    // console.log(size);
    if (size >= this.fileSize) await this.clearLog();

    const logLine = `${new Date().toISOString()} ${type} ${msg}${ctx ? ' ' + ctx : ''}\n`;
    await appendFile(this.path, logLine);
  }

  async clearLog() {
    // const data = await readFile(this.path, { encoding: 'utf-8' });
    // console.log(data.split('\n').length, 'before');
    // const linesArr = data.split('\n');
    // linesArr.shift();
    // console.log(linesArr.length, 'after');
    // writeFile(this.path, linesArr.join('\n'));
    await writeFile(this.path, '');
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
      this.logToFile(msg, 'ERROR', ctx);
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
