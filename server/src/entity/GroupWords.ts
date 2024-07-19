import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './Group';
import { Word } from './Word';

@Entity()
export class GroupWords {
  @PrimaryColumn()
  GroupID: number;

  @PrimaryColumn()
  WordId : string;

  @ManyToOne(() => Group)
  @JoinColumn({name:'GroupId'})
  group: Group;

  @ManyToOne(() => Word)
  @JoinColumn({ name: 'WordID' }) 
  word: Word;

}
