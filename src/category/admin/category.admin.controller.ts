import { Body, Controller, Get, Param, Post, Render, Res } from "@nestjs/common";
import { Response } from "express";
import { CategoryService } from "../category.service";

@Controller('category')
export class CategoryAdminControler {
    constructor(private categoryService: CategoryService) {}


    @Get()
    @Render('admin/category')
    async get_category(){
        const categories = await this.categoryService.get_all_category()
        return {
            title: 'Kategori İşlemleri',
            categories: categories
        }
    }

    @Post()
    async post_category(@Body() data:any, @Res() res:Response){
        const save = await this.categoryService.add_category(data)
        res.redirect(302, '/admin/category')
    }

    @Get('/delete/:id')
    async get_delete_category(@Param('id') id:number, @Res() response:Response){
        await this.categoryService.delete_category(id)
        response.redirect(302, '/admin/category')
    }
}