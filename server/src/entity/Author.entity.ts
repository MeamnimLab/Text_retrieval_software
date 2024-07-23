import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Song } from "./Song.entity";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    AuthorID: number;

    @Column()
    Name: string;

    @OneToMany(() => Song, song => song.Author)
    songs: Song[];

}
