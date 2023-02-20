import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { Join } from './entities/join.entity';
import { BullModule } from '@nestjs/bull';
import { JoinConsumer } from './join.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Join]),
    BullModule.registerQueue({
      name: 'joinQueue'
    })
  ],
  controllers: [BoardsController],
  providers: [BoardsService, JoinConsumer]
})
export class BoardsModule {}
