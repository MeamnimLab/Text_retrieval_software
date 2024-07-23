import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Composer {
    @PrimaryGeneratedColumn()
    ComposerID: number;

    @Column()
    Name: string;

    @Column("text")
    Bio: string;
}
