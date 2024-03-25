import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/Logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggingService: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { body, params, baseUrl } = req;
    res.on('finish', () => {
      this.loggingService.log(
        `>>> Url: ${baseUrl} > Params: ${JSON.stringify(params)} > Body: ${JSON.stringify(body)}`,
      );
      this.loggingService.log(`<<< Status code: ${res.statusCode}`);
    });
    next();
  }
}
