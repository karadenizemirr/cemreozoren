import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address:string

    @Column()
    state:string

    @Column()
    city: string

    @Column()
    neighborhood: string

    @Column({nullable: true})
    zip: string

    @Column({nullable: true})
    latitude: string

    @Column({nullable: true})
    longitude: string

    @OneToOne(() => Product, product => product.location)
    @JoinColumn()
    product: Product
    
}