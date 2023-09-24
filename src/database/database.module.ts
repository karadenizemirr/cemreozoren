import { Module } from "@nestjs/common";
import { postgresqlProviders } from "./postgresql/postgresql.provider";

@Module({
    providers:[...postgresqlProviders],
    exports: [...postgresqlProviders]
})
export class DatabaseModule {}