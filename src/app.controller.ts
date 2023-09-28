import { Controller, Get, Render, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import * as secureSession from '@fastify/secure-session';
import { CategoryService } from './category/category.service';
import { Request, Response } from 'express';
import { LocationService } from './location/location.service';
import { ProductService } from './product/product.service';
import { VisitorService } from './customService/visitor.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private categoryService: CategoryService, 
    private locationService: LocationService,
    private productService: ProductService,
    private visitorService: VisitorService
    ) {}

  @Get()
  @Render('index')
  async get_home(@Session() session: secureSession.Session, @Req() req: Request){
    let categories:any;
    let products:any;
    const locations = await this.locationService.get_all_location()

    if (req.cookies.lang == 'tr' || req.cookies.lang == undefined || !req.cookies.lang){
      categories = await this.categoryService.get_all_category_tr()
      products = await this.productService.get_all_product_tr()

    }else{
      categories = await this.categoryService.get_all_category_eng()
      products = await this.productService.get_all_product_eng()
    } 
    
    return {
      title: 'Anasayfa',
      categories: categories,
      locations: locations,
      products: products
    }
  }

  @Get('tr')
  async get_tr(@Session() session:secureSession.Session, @Res() response:Response): Promise<void>{
    response.cookie('lang', 'tr')
    response.redirect(302, '/')
  }

  @Get('eng')
  async get_eng(@Session() session:secureSession.Session, @Res() response: Response): Promise<void>{
    response.cookie('lang', 'en')
    response.redirect(302, '/')
  }

  @Get('dashboard')
  @Render('admin/index')
  @UseGuards(AuthGuard)
  async get_dashboard(){
    const products = await this.productService.get_all_product()
    const length = products.length
    const visitors = await this.visitorService.get_visitors()

    return {
      title: 'Yönetici Paneli',
      product_lenght: length,
      visitors: visitors
    }
  }
}
