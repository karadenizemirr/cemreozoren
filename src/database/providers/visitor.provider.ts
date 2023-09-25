import { DataSource } from "typeorm";
import { Visitor } from "../models/Visitor";

export const visitorProvider = [
    {
        provide: 'VISITOR_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Visitor),
        inject: ['DATA_SOURCE']
    }
]