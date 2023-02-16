import _ from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Join } from './entities/join.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Join) private joinRepository: Repository<Join>,
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
      .getMany();
  }

  async createBoard(boardData: CreateBoardDto) {
    this.boardRepository.insert(boardData);
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
    await this.getBoard(boardId);
    this.joinRepository.insert({ boardId, userId });
  }
}
