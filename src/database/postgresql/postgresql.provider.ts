import { DataSource } from "typeorm"
import { Category } from "../models/Category"
import { Language } from "../models/Language"
import { Amenitlies } from "../models/product/Amenitlies"
import { Description } from "../models/product/Description"
import { Detail } from "../models/product/Detail"
import { Location } from "../models/product/Location"
import { Media } from "../models/product/Media"
import { Product } from "../models/product/Product"

export const postgresqlProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                username: 'postgres',
                password: '123456',
                database: 'cemreozoren',
                entities: [Category, Language,Amenitlies, Description, Detail, Location, Media,Product],
                synchronize: true
            })
            return dataSource.initialize()
        }
    }
]