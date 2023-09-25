import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Product } from "./product/Product";

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    language: string

    @OneToOne(() => Category, category => category.language)
    @JoinColumn()
    category: Category

    @OneToOne(() => Product, product => product.language, {onDelete: 'CASCADE'})
    @JoinColumn()
    product: Product
}