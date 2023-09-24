import { Description } from "src/database/models/product/Description";
import { DataSource } from "typeorm";

export const descriptionProviders = [
    {
        provide: 'DESCRIPTION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Description),
        inject: ['DATA_SOURCE']
    }
]