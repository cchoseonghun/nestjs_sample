import _ from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getBoards(): Promise<Board[]> {
    return await this.boardRepository.find({
      where: { deletedAt: null },
      select: ['id', 'title', 'author', 'createdAt'],
    });
  }

  async createBoard(boardData: CreateBoardDto) {
    this.boardRepository.insert(boardData);
  }

  async getBoard(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id, deletedAt: null },
      select: ['id', 'title', 'content', 'author', 'createdAt', 'updatedAt'],
    });
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
    });
  }

  async deleteBoard(id: number) {
    await this.getBoard(id);
    this.boardRepository.softDelete(id);
  }
}
