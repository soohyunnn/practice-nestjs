import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommonService } from './common/common.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
  ) {}
  // constructor(private readonly configService: ConfigService) {}

  @UseGuards(AuthGuard)
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
