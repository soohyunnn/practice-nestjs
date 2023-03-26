import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common/common.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
  ) {}
  // constructor(private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    return process.env.DATABASE_HOST;
  }

  @Get('/common-hello')
  getCommonHello(): string {
    console.log(this.configService.get('DATABASE_HOST'));
    return this.commonService.hello();
  }
}
