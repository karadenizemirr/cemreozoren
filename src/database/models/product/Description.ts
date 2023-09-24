import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Description {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({nullable: true})
    title: string

    @Column({nullable: true})
    description: string

    @Column({nullable: true})
    price_in: number

    @Column({nullable: true})
    yearly_tax_rate: string

    @Column({nullable: true})
    association_fee: string

    @Column({nullable: true})
    after_price_label:string

    @Column({nullable: true})
    before_price_label:string

    @Column({nullable: true})
    property_status: string

    @OneToOne(() => Product, product => product.description)
    @JoinColumn()
    product: Product
    
}