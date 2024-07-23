import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupWords } from './GroupWords.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  GroupID: number;

  @Column({ length: 255 })
  GroupName: string;
}
