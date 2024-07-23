import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ExpressionWords } from "./ExpressionWords.entity";

@Entity()
export class LinguisticExpression {
    @PrimaryGeneratedColumn()
    ExpressionID: number;

    @OneToMany(() => ExpressionWords, expressionWords => expressionWords.Expression)
    ExpressionWords: ExpressionWords[];
}
