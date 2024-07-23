import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Song } from "./Song.entity";

@Entity()
export class Composer {
    @PrimaryGeneratedColumn()
    ComposerID: number;

    @Column()
    Name: string;

    
    @OneToMany(() => Song, song => song.Composer)
    songs: Song[];


}
