import { Detail } from "src/database/models/product/Detail";
import { DataSource } from "typeorm";

export const detailProviders = [
    {
        provide: 'DETAIL_REPOSITORY',
        useFactory:(dataSource: DataSource) => dataSource.getRepository(Detail),
        inject: ['DATA_SOURCE']
    }
]