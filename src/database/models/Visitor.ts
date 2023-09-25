import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Visitor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    count: number;
}