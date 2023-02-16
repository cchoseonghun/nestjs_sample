import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  private boards: Board[] = [{
    id: 1,
    title: 'title 1',
    content: 'content 1',
    author: 'author 1',
  }];
  private pk = 1;

  async getBoards(): Promise<Board[]> {
    return this.boards;
  }

  async createBoard(boardData: CreateBoardDto): Promise<Board> {
    this.pk += 1;
    this.boards.push({
      id: this.pk,
      ...boardData,
    });
    const newData = await this.getBoard(this.pk);
    return newData;
  }

  async getBoard(id: number): Promise<Board> {
    const board = this.boards.find(board => board.id === id);
    if (!board) {
      throw new NotFoundException(`Board with ID: ${id} not found.`);
    }
    return board;
  }
}
