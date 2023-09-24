import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Detail {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    size_in_ft: string

    @Column({nullable: true})
    bedrooms: string

    @Column({nullable: true})
    garages: string

    @Column({nullable: true})
    available_from: Date

    @Column({nullable: true})
    roofing:string

    @Column({nullable: true})
    floors_no: string

    @Column({nullable: true})
    lot_size_in_ft: string

    @Column({nullable: true})
    bathrooms: string

    @Column({nullable: true})
    garage_size:string

    @Column({nullable: true})
    basement: string

    @Column({nullable: true})
    exterior_material: string

    @Column({nullable: true})
    rooms:string

    @Column({nullable: true})
    custom_id: string

    @Column({nullable: true})
    year_built: string

    @Column({nullable: true})
    extra_details: string

    @Column({nullable: true})
    structure_type: string

    @Column({nullable: true})
    agent_nots:string

    @Column({nullable: true})
    energy_class: string

    @Column({nullable: true})
    index_in_kwh: string

    @OneToOne(() => Product, product => product.detail)
    @JoinColumn()
    product: Product
}