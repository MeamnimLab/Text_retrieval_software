import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Word } from './Word';

@Entity()
export class LinguisticExpression {
  @PrimaryGeneratedColumn()
  ExpressionID: number;

  @Column({ length: 255 })
  ExpressionText: string;

}
