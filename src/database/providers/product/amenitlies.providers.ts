import { Amenitlies } from "src/database/models/product/Amenitlies";
import { DataSource } from "typeorm";

export const amenitliesProviders = [
    {
        provide: 'AMENITLIES_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Amenitlies),
        inject: ['DATA_SOURCE']
    }
]