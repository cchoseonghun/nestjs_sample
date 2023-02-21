import _ from 'lodash';
import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Join } from './entities/join.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import fs, { writeFileSync } from 'fs';
import { extname } from 'path';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Join) private joinRepository: Repository<Join>,
    private dataSource: DataSource,
    @InjectQueue('joinQueue') private joinQueue: Queue,
  ) {}

  async getBoards(): Promise<Board[]> {
    return await this.boardRepository
      .createQueryBuilder('boards')
      .leftJoin('boards.joins', 'join')
      .select([
        'boards.id',
        'boards.title',
        'boards.writerId',
        'boards.joinLimit',
        'boards.createdAt',
        'join.userId',
      ])
      .orderBy('boards.id', 'DESC')
      .getMany();
  }

  async createBoard(boardData: CreateBoardDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    // 저장 폴더 세팅(폴더 없으면 생성, 있으면 패스)
    const uploadFolder = `uploads`;
    fs.mkdirSync(uploadFolder, { recursive: true });
    // 파일 이름 날짜+확장자 -> 파일 이름의 한글 깨짐 현상을 무시할 수 있음
    const imagePath = Date.now() + extname(file.originalname);
    // 파일 업로드 경로
    const uploadPath = `${__dirname}/../../${uploadFolder}/${imagePath}`;

    // 게시글 저장
    boardData.imagePath = imagePath;
    this.boardRepository.insert(boardData);
    // 파일 생성
    writeFileSync(uploadPath, file.buffer);
  }

  async getBoard(id: number): Promise<Board> {
    const board = await this.boardRepository
      .createQueryBuilder('boards')
      .leftJoin('boards.joins', 'join')
      .where('boards.id = :id', { id })
      .select([
        'boards.id',
        'boards.title',
        'boards.content',
        'boards.writerId',
        'boards.joinLimit',
        'boards.createdAt',
        'boards.updatedAt',
        'join.userId',
      ])
      .getOne();

    if (_.isNil(board)) {
      throw new NotFoundException(`해당하는 게시글이 존재하지 않음. ID: ${id}`);
    }
    return board;
  }

  async updateBoard(id: number, boardData: UpdateBoardDto) {
    await this.getBoard(id);
    this.boardRepository.update(id, {
      title: boardData.title,
      content: boardData.content,
      joinLimit: boardData.joinLimit,
    });
  }

  async deleteBoard(id: number) {
    await this.getBoard(id);
    this.boardRepository.softDelete(id);
  }

  async joinGroup(boardId: number, userId: number) {
    const board = await this.getBoard(boardId);
    const boardJoinInfo = await this.joinRepository.find({
      where: { boardId },
    });

    if (board.joinLimit <= boardJoinInfo.length) {
      console.log('자리부족 err: ', boardId, userId);
      throw new ForbiddenException('자리 부족');
    }
    boardJoinInfo.forEach((join) => {
      if (join.userId === userId) {
        throw new ConflictException('이미 join 했습니다.');
      }
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // await queryRunner.startTransaction('SERIALIZABLE');

    try {
      await queryRunner.manager.getRepository(Join).insert({
        boardId, userId,
      });
      const afterJoin = await this.joinRepository.count({
        where: { boardId },
      });
      if (board.joinLimit <= afterJoin) {
        throw new Error('동시성 문제 발생');
      }
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadGatewayException(e.message);
    } finally {
      await queryRunner.release();
    }
  }

  async addJoinQueue(boardId: number, userId: number) {
    await this.joinQueue.add(
      'join',
      { boardId, userId, },
      { removeOnComplete: true, removeOnFail: true },
    );
  }
}
