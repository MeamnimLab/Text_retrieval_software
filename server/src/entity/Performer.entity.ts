import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Song } from "./Song.entity";

@Entity()
export class Performer {
    @PrimaryGeneratedColumn()
    PerformerID: number;

    @Column()
    Name: string;

    
    @OneToMany(() => Song, song => song.Performer)
    songs: Song[];
}
