import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
