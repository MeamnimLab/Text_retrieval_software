import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Author } from "./Author.entity";
import { Composer } from "./Composer.entity";
import { Performer } from "./Performer.entity";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    SongID: number;

    @Column()
    Title: string;

    @Column("date")
    ReleaseDate: string;

    @ManyToOne(() => Author, author => author.AuthorID)
    Author: Author;

    @ManyToOne(() => Composer, composer => composer.ComposerID)
    Composer: Composer;

    @ManyToOne(() => Performer, performer => performer.PerformerID)
    Performer: Performer;
}
