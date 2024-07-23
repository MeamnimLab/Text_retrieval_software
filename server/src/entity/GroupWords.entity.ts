import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Group } from "./Group.entity";
import { Word } from "./Word.entity";

@Entity()
export class GroupWords {
    @PrimaryColumn()
    GroupID: number;

    @PrimaryColumn()
    WordID: number;

    @ManyToOne(() => Group, group => group.GroupID)
    Group: Group;

    @ManyToOne(() => Word, word => word.WordID)
    Word: Word;
}
