import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Song } from './Song';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  WordID: number;

  @Column({ length: 255 })
  WordText: string;

  @Column('int')
  SongId: number;

  @Column('int')
  Stanza: number;

  @Column('int')
  Line: number;

  @Column('int')
  Index: number;

  @ManyToOne(() => Song)
  @JoinColumn({ name: 'SongId' }) 
  song: Song;
}
