import { Module } from "@nestjs/common";
import { CategoryService } from "../category.service";
import { CategoryAdminControler } from "./category.admin.controller";
import { categoryProviders } from "src/database/providers/category.providers";

@Module({
    controllers:[CategoryAdminControler],
    providers: [CategoryService, ...categoryProviders],

})
export class CategoryAdminModule {}
