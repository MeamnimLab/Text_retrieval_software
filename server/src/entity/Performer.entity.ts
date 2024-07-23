import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Performer {
    @PrimaryGeneratedColumn()
    PerformerID: number;

    @Column()
    Name: string;

    @Column("text")
    Bio: string;
}
