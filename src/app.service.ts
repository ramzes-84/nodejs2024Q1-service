import { Injectable } from '@nestjs/common';
import { LoggingService } from './Logger/logger.service';

@Injectable()
export class AppService {
  constructor(private loggingService: LoggingService) {
    this.loggingService.setContext('AppService');
  }

  getHello(): string {
    this.loggingService.logToFile();
    return 'Hello world';
  }
}
