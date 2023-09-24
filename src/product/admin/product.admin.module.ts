import { Module } from "@nestjs/common";
import { ProductAdminController } from "./product.admin.controller";
import { ProductService } from "../product.service";
import { CategoryService } from "src/category/category.service";
import { categoryProviders } from "src/database/providers/category.providers";
import { descriptionProviders } from "src/database/providers/product/description.providers";
import { mediaProviders } from "src/database/providers/product/media.providers";
import { locationProviders } from "src/database/providers/product/location.providers";
import { detailProviders } from "src/database/providers/product/detail.providers";
import { productProviders } from "src/database/providers/product/product.providers";
import { languageProviders } from "src/database/providers/language.provider";

@Module({
    imports: [],
    controllers: [ProductAdminController],
    providers: [
        ProductService,
        CategoryService, 
        ...categoryProviders, 
        ...descriptionProviders, 
        ...mediaProviders,
        ...locationProviders,
        ...detailProviders,
        ...productProviders,
        ...languageProviders
    ],
    exports: [ProductService]
})
export class ProductAdminModule {}