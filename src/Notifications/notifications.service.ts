import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UncaughtExceptionEvent } from 'src/Events/error.event';

@Injectable()
export class NotificationsService {
  @OnEvent('new.uncaughtException')
  notifyUser(payload: UncaughtExceptionEvent) {
    console.log(`EVENT ${payload.msg} has been emitted.`);
  }
  @OnEvent('test.event')
  handleEvent() {
    console.log(`[NotificationsService] EVENT has been emitted.`);
  }
}
