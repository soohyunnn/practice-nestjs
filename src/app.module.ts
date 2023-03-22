import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { BoardModule } from './board/board.module';
import { ApiController } from './api/api.controller';

@Module({
  imports: [BoardModule],
  controllers: [AppController, UsersController, ApiController],
  providers: [AppService],
})
export class AppModule {}
