import { Product } from "src/database/models/product/Product";
import { DataSource } from "typeorm";

export const productProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
        inject: ['DATA_SOURCE']
    }
]