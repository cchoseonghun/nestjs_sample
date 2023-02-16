import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';

describe('BoardsService', () => {
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', async () => {
      const boards = await service.getBoards();
      expect(boards).toBeInstanceOf(Array);
    });
  });

  describe('createBoard', () => {
    it('should return a board', async () => {
      const boardData = {
        title: 'title',
        content: 'content',
        author: 'author',
      };
      const beforeCreate = (await service.getBoards()).length;
      service.createBoard(boardData);
      const afterCreate = (await service.getBoards()).length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('getBoard', () => {
    it('should return a board', async () => {
      const boardData = {
        title: 'title',
        content: 'content',
        author: 'author',
      };
      service.createBoard(boardData);
      const id = 1;
      const board = await service.getBoard(id);
      expect(board).toBeDefined();
      expect(board.id).toEqual(id);
    });
    it('should throw a NotFoundException', async () => {
      const id = 999;
      try {
        await service.getBoard(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
