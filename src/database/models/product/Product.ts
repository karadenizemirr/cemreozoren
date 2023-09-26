import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Language } from "../Language";
import { Media } from "./Media";
import { Location } from "./Location";
import { Detail } from "./Detail";
import { Description } from "./Description";
import { Amenitlies } from "./Amenitlies";
import { Category } from "../Category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @OneToOne(() => Language, language => language.product)
    language: Language

    @OneToMany(() => Media, media => media.product)
    media: Media[]

    @OneToOne(() => Location, location => location.product)
    location: Location

    @OneToOne(() => Detail, detail => detail.product)
    detail: Detail

    @OneToOne(() => Description, description => description.product)
    description: Description

    @ManyToOne(() => Category, category => category.product)
    category: Category

}