import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommonService } from './common/common.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { AppService } from './app.service';
import { Roles } from './utils/decorators/roles.decorator';

@Roles('admin')
@Controller('app')
export class AppController {
  constructor(
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}
  // constructor(private readonly configService: ConfigService) {}

  // @UseGuards(AuthGuard)
  @Roles('admin')
  @Get()
  getHello(): string {
    this.appService.getHello();
    return process.env.DATABASE_HOST;
  }

  @Get('/common-hello')
  getCommonHello(): string {
    console.log(this.configService.get('DATABASE_HOST'));
    return this.commonService.hello();
  }
}
