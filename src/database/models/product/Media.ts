import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    image_path: string

    @Column({nullable: true})
    video_path:string

    @Column({nullable: true})
    virtual_tour: string

    @ManyToOne(() => Product, product => product.media)
    product: Product
}