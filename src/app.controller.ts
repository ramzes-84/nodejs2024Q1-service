import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingService } from './Logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggingService: LoggingService,
  ) {
    this.loggingService.setContext('AppController');
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
  // throw() {
  //   throw new NotFoundException('Exception for testing');
  // }
}
