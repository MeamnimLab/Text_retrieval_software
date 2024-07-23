import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    AuthorID: number;

    @Column()
    Name: string;

    @Column("text")
    Bio: string;
}
