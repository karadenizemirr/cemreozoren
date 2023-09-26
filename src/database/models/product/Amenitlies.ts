import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Amenitlies {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    title: string
    
}