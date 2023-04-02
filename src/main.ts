import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { logger3 } from './logger/logger3.middleware';
import { AuthGuard } from './auth.guard';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import { HttpExceptionFilter } from './http.exception.filter';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? 'production.env'
      : process.env.NODE_ENV === 'stage'
      ? 'stage.env'
      : 'development.env',
  ),
});

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   logger:
  //     process.env.NODE_ENV === 'production'
  //       ? ['error', 'warn', 'log']
  //       : ['error', 'warn', 'log', 'verbose', 'debug'],
  // });
  // const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // app.use(logger3);
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  });
  // app.useGlobalFilters(new HttpExceptionFilter()); //전역 필터 적용
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  console.log(process.env.NODE_ENV);
  // console.log(process.env.DATABASE_PASSWORD);
  // console.log('__dirname:: ', __dirname);
  await app.listen(3000);
}
bootstrap();
