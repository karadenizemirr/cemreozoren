import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductAdminModule } from "./admin/product.admin.module";

@Module({
    imports: [ProductAdminModule],
    controllers: [ProductController],
    providers: [],
})
export class ProductModule {}