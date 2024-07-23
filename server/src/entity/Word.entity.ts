import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ExpressionWords } from "./ExpressionWords.entity";
import { SongWords } from "./SongWords.entity";

@Entity()
export class Word {
    @PrimaryGeneratedColumn()
    WordID: number;

    @Column()
    WordText: string;

    @OneToMany(() => ExpressionWords, expressionWords => expressionWords.Word)
    ExpressionWords: ExpressionWords[];

    @OneToMany(() => SongWords, songWords => songWords.WordID)
    SongWords: SongWords[];
}
