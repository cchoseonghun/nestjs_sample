import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getBoards(): Promise<Board[]> {
    return await this.boardsService.getBoards();
  }

  @Post()
  createBoard(@Body() boardData: CreateBoardDto) {
    return this.boardsService.createBoard(boardData);
  }

  @Get(':id')
  async getBoard(@Param('id') id: number): Promise<Board> {
    return await this.boardsService.getBoard(id);
  }

  @Put(':id')
  async updateBoard(
    @Param('id') id: number,
    @Body() boardData: UpdateBoardDto,
  ) {
    return await this.boardsService.updateBoard(id, boardData);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: number) {
    return await this.boardsService.deleteBoard(id);
  }

  @Post(':id/join')
  async joinGroup(@Param('id') boardId: number, @Req() req: Request) {
    console.log(req.cookies);
    
    const { userId } = req.cookies;
    return await this.boardsService.joinGroup(boardId, parseInt(userId));
  }
}
