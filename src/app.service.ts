import { Injectable } from '@nestjs/common';
import { LoggingService } from './Logger/logger.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  constructor(
    private loggingService: LoggingService,
    private eventEmitter: EventEmitter2,
  ) {
    this.loggingService.setContext('AppService');
  }

  getHello(): string {
    this.eventEmitter.emit('test.event');
    return 'Hello world';
  }
}
