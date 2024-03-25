import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { LoggingService } from 'src/Logger/logger.service';
import { ErrMsg } from 'src/types';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new LoggingService();

  constructor(private readonly httpAdapter: AbstractHttpAdapter) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const message =
      exception instanceof HttpException
        ? exception.message
        : ErrMsg.SERVER_ERR;
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: this.httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };
    if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack);
    }

    this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
