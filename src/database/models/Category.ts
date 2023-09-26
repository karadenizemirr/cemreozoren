import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Language } from "./Language";
import { Product } from "./product/Product";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(() => Language, language => language.category)
    language: Language

    @OneToMany(() => Product, product => product.category)
    product: Product[]
}