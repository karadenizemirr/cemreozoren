import { Body, Controller, Get, Param, Post, Render, Req, Res } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Request, Response } from "express";

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('search')
    @Render('home/product/search')
    async get_search(@Body() body:any, @Req() req:Request, @Res() res:Response){
        const search_query = body.type +' '+ body.location+ ' ' + body.search
        let result:any = undefined;

        if (req.cookies.lang && req.cookies.lang === 'tr' || req.cookies.lang === undefined){
            result = await this.productService.search_product_tr(search_query)
        }else{
            result = await this.productService.search_product_eng(search_query)
        }
        
        return {
            title: 'Search Result',
            result: result
        }
    }

    @Get('detail/:id')
    @Render('home/product/detail')
    async get_detail(@Param('id') id:number, @Req() req: Request){

        let result:any = undefined;
        if (req.cookies.lang && req.cookies.lang === 'tr' || req.cookies.lang === undefined){
            result = await this.productService.get_product_detail_tr(id)
        }else{
            result = await this.productService.get_product_detail_eng(id)
        }

        return {
            title: 'Product Detail',
            result: result
        }
    }
}