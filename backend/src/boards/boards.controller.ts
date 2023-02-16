import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getBoards(): Promise<Board[]> {
    return await this.boardsService.getBoards();
  }

  @Post()
  async createBoard(@Body() boardData: CreateBoardDto): Promise<Board> {
    return await this.boardsService.createBoard(boardData);
  }

  @Get(':id')
  async getBoard(@Param('id') id: number): Promise<Board> {
    return await this.boardsService.getBoard(id);
  }
}
