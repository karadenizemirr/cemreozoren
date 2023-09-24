import { DataSource } from "typeorm";
import { Category } from "../models/Category";

export const categoryProviders = [
    {
        provide: 'CATEGORY_REPOSITORY',
        useFactory:(dataSource: DataSource) => dataSource.getRepository(Category),
        inject: ['DATA_SOURCE']
    }
]