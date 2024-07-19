import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from './Author';
import { Composer } from './Composer';
import { Performer } from './Performer';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  SongID: number;

  @Column({ length: 255 })
  Title: string;

  @Column('date')
  ReleaseDate: Date;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'AuthorID' }) // Specifies the column name for the foreign key
  Author: Author;

  @ManyToOne(() => Composer)
  @JoinColumn({ name: 'ComposerID' }) // Specifies the column name for the foreign key
  Composer: Composer;

  @ManyToOne(() => Performer)
  @JoinColumn({ name: 'PerformerID' }) // Specifies the column name for the foreign key
  Performer: Performer;
}
