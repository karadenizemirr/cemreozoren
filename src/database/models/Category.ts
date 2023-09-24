import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Language } from "./Language";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(() => Language, language => language.category)
    language: Language
}