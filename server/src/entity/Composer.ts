import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Song } from './Song';

@Entity()
export class Composer {
  @PrimaryGeneratedColumn()
  ComposerID: number;

  @Column({ length: 255 })
  Name: string;

  @Column('text')
  Bio: string;
}
