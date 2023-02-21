import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Join } from './join.entity';

@Entity({ schema: 'nestjs_sample', name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('varchar', { length: 1000 })
  content: string;

  @Column('int')
  writerId: number;

  @Column('int')
  joinLimit: number;

  @Column('varchar')
  imagePath: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany((type) => Join, (join) => join.board)
  joins: Join[];
}
