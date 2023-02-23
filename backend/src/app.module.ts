import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   }
    // }),  // 아래로 변경해봄
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: 'localhost',
          port: 6379,
          retryStrategy: (times) => {
            // check connection
            //console.log('could not connect to redis!');
            process.exit(1);
          },
        },
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      ttl: 300000,  // 데이터 캐싱 시간(밀리 초 단위)
      max: 100, // 최대 캐싱 개수
      isGlobal: true,
    }),
    BoardsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
