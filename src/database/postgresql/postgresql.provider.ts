import { DataSource } from "typeorm"
import { Category } from "../models/Category"
import { Language } from "../models/Language"
import { Amenitlies } from "../models/product/Amenitlies"
import { Description } from "../models/product/Description"
import { Detail } from "../models/product/Detail"
import { Location } from "../models/product/Location"
import { Media } from "../models/product/Media"
import { Product } from "../models/product/Product"
import { User } from "../models/User"
import { Visitor } from "../models/Visitor"

// export const postgresqlProviders = [
//     {
//         provide: 'DATA_SOURCE',
//         useFactory: () => {
//             const dataSource = new DataSource({
//                 type: 'mysql',
//                 host: 'uzb4o9e2oe257glt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//                 username: 'e2l9dtmizzsg8a7b',
//                 password: 'vxdj4h3wkyweoya7',
//                 database: 'c8tofqdid2iy4zqg',
//                 port: 3306,
//                 entities: [Category, Language, Amenitlies, Description, Detail, Location, Media, Product, User, Visitor],
//                 synchronize: true
//             })
//             return dataSource.initialize()
            
//         }
//     }
// ]

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
                port: 5432,
                entities: [Category, Language, Amenitlies, Description, Detail, Location, Media, Product, User, Visitor],
                synchronize: true
            })
            return dataSource.initialize()
            
        }
    }
]