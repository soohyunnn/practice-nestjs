import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { ApiController } from './api/api.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BoardModule, UsersModule],
  controllers: [ApiController, AppController],
  providers: [AppService],
})
export class AppModule {}
