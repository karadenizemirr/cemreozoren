import { Media } from "src/database/models/product/Media";
import { DataSource } from "typeorm";

export const mediaProviders = [
    {
        provide: 'MEDIA_REPOSITORY',
        useFactory:(dataSource: DataSource) => dataSource.getRepository(Media),
        inject: ['DATA_SOURCE']
    }
]