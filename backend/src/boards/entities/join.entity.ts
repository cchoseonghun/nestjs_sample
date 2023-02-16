import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity({ schema: 'nestjs_sample', name: 'join' })
export class Join {
  @PrimaryColumn()
  boardId: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne((type) => Board, (board) => board.joins)
  board: Board;
}
