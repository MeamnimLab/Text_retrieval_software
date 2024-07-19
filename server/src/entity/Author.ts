import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Song } from './Song';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  AuthorID: number;

  @Column({ length: 255 })
  Name: string;

  @Column('text')
  Bio: string;
}
