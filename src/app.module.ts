import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ApiController],
  providers: [],
})
export class AppModule {}
