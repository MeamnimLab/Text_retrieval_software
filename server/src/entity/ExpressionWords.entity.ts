import { Entity, ManyToOne, PrimaryColumn, Column } from "typeorm";
import { LinguisticExpression } from "./LinguisticExpression.entity";
import { Word } from "./Word.entity";

@Entity()
export class ExpressionWords {
    @PrimaryColumn()
    ExpressionID: number;

    @PrimaryColumn()
    WordID: number;

    @Column()
    WordOrder: number;

    @ManyToOne(() => LinguisticExpression, expression => expression.ExpressionWords)
    Expression: LinguisticExpression;

    @ManyToOne(() => Word, word => word.ExpressionWords)
    Word: Word;
}
