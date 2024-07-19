import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Song } from './Song';

@Entity()
export class Performer {
  @PrimaryGeneratedColumn()
  PerformerID: number;

  @Column({ length: 255 })
  Name: string;

  @Column('text')
  Bio: string;

}
