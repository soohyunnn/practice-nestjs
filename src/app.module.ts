import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { CommonModule } from './modules/common.module';
import emailConfig from './config/email.config';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/${process.env.NODE_ENV}.env`],
      load: [emailConfig],
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
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      // entities: [UserEntity],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      logging: true,
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
