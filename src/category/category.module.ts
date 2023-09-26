import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { categoryProviders } from "src/database/providers/category.providers";
import { ProductService } from "src/product/product.service";
import { ProductModule } from "src/product/product.module";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, ...categoryProviders]
})
export class CategoryModule {}