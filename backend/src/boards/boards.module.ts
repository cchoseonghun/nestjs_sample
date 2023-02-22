import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { Join } from './entities/join.entity';
import { BullModule } from '@nestjs/bull';
import { JoinConsumer } from './join.consumer';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/common/utils/multer.options.factory';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Join]),
    BullModule.registerQueue({
      name: 'joinQueue'
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, JoinConsumer]
})
export class BoardsModule {}
