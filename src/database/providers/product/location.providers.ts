import { Location } from "src/database/models/product/Location";
import { DataSource } from "typeorm";

export const locationProviders = [
    {
        provide: 'LOCATION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Location),
        inject: ['DATA_SOURCE']
    }
]