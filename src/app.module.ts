import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { CommonModule } from './modules/common.module';
import emailConfig from './config/email.config';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './logger/logger.middleware';
import { Logger2Middleware } from './logger/logger2.middleware';
import { UsersController } from './users/users.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth/auth.service';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import authConfig from './config/authConfig';
import { HandlerRolesGuard } from './handler.roles.guard';
import { ClassRolesGuard } from './class.roles.guard';
import { RolesGuard } from './roles.guard';

@Module({
  providers: [
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: HandlerRolesGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ClassRolesGuard,
    // },
    AuthService,
  ],
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST, // localhost
      port: 13306,
      username: process.env.DATABASE_USERNAME, //root
      password: process.env.DATABASE_PASSWORD, //test
      database: 'test',
      // entities: [__dirname + '/**/*.entity{.js,.ts}'],
      entities: [UserEntity],
      logging: true,
      synchronize: true,
      migrationsRun: false,
      migrations: [__dirname + '/**/migrations/*.js'],
      migrationsTableName: 'migrations',
    }),
    CommonModule,
  ],
  controllers: [],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): any {
//     consumer
//         .apply(LoggerMiddleware, Logger2Middleware)
//         // .exclude({ path: '/users', method: RequestMethod.GET })
//         .forRoutes(UsersController);
//   }
// }
