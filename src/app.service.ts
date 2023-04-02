import { Injectable, Logger } from '@nestjs/common';
import { MyLogger } from './logger/MyLogger';

@Injectable()
export class AppService {
  // private readonly logger = new Logger(AppService.name);

  constructor(private myLogger: MyLogger) {}

  getHello(): string {
    this.myLogger.error('level: error');
    this.myLogger.warn('level: warn');
    this.myLogger.log('level:log');
    this.myLogger.verbose('level:verbose');
    this.myLogger.debug('level:debug');

    return 'Hello World!';
  }
}
