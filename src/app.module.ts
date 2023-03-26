import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { CommonModule } from './modules/common.module';
import emailConfig from './config/email.config';
import { validationSchema } from './config/validationSchema';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
