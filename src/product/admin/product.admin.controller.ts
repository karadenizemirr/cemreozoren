import { Body, Controller, Get, Param, Post, Render, Res, UseInterceptors } from "@nestjs/common";
import { ProductService } from "../product.service";
import { CategoryService } from "src/category/category.service";
import { FilesInterceptor, MemoryStorageFile, UploadedFiles } from "@blazity/nest-file-fastify";
import e, { Response } from "express";

@Controller('product')
export class ProductAdminController {
    constructor(private productService: ProductService, private categoryService: CategoryService) { }

    @Get('/add')
    @Render('admin/product/add')
    async get_add(){
        const categories = await this.categoryService.get_all_category();
        return {
            title: 'Ürün Ekle',
            categories: categories
        }
    }

    @Post('/add')
    @UseInterceptors(FilesInterceptor('images', 10, {
        dest: 'src/assets/public/uploads',
    }))
    async post_add(@Body() data:any, @UploadedFiles() files: MemoryStorageFile[], @Res() res:Response){
        data.files = files;
        await this.productService.add_product(data)
        res.redirect(302, '/admin/product')
    }

    @Get()
    @Render('admin/product/index')
    async get_product(){
        const products = await this.productService.get_all_product();
        return {
            title: 'Ürünler',
            products: products
        }
    }

    @Get('delete/:id')
    async get_delete(@Param('id') id:number, @Res() response: Response){
        await this.productService.get_product_delete(id)
        response.redirect(302, '/admin/product')
    }
}
