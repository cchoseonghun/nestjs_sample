import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('file'))
  createBoard(
    @Body() boardData: CreateBoardDto,
    @UploadedFile() file: Express.Multer.File,
    // @UploadedFile() file: Express.MulterS3.File,
  ) {
    return this.boardsService.createBoard(boardData, file);
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
    const { userId } = req.cookies;
    if (userId === '' || isNaN(userId)) {
      throw new BadRequestException('userId가 잘못되었습니다.');
    }
    return await this.boardsService.addJoinQueue(boardId, parseInt(userId));
  }

  @Post(':id/join2')
  async joinGroup2(@Param('id') boardId: number, @Body() body: {userId: string}) {
    const { userId } = body;
    return await this.boardsService.addJoinQueue(boardId, parseInt(userId));
  }
}
