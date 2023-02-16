import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { Join } from './entities/join.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Join])],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
