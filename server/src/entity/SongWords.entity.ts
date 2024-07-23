import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Song } from "./Song.entity";
import { Word } from "./Word.entity";

@Entity()
export class SongWords {
    @PrimaryGeneratedColumn()
    SongWordsID: number;

    @ManyToOne(() => Song, song => song.SongID)
    SongID: Song;

    @ManyToOne(() => Word, word => word.WordID)
    WordID: Word;

    @Column()
    Line: number;

    @Column()
    WordIndex: number;
}
