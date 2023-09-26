import { Inject, Injectable } from "@nestjs/common";
import { IDescription } from "src/database/interface/IDescription";
import { IDetail } from "src/database/interface/IDetail";
import { ILocation } from "src/database/interface/ILocation";
import { IMedia } from "src/database/interface/IMedia";
import { Category } from "src/database/models/Category";
import { Language } from "src/database/models/Language";
import { Description } from "src/database/models/product/Description";
import { Detail } from "src/database/models/product/Detail";
import { Location } from "src/database/models/product/Location";
import { Media } from "src/database/models/product/Media";
import { Product } from "src/database/models/product/Product";
import { ILike, Like, Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @Inject('DESCRIPTION_REPOSITORY') private descriptionRepository: Repository<Description>,
        @Inject('MEDIA_REPOSITORY') private mediaRepository: Repository<Media>,
        @Inject('LOCATION_REPOSITORY') private locationRepository: Repository<Location>,
        @Inject('DETAIL_REPOSITORY') private detailRepository: Repository<Detail>,
        @Inject('PRODUCT_REPOSITORY') private productRepository: Repository<Product>,
        @Inject('LANGUAGE_REPOSITORY') private languageRepository: Repository<Language>,
        @Inject('CATEGORY_REPOSITORY') private categoryRepository: Repository<Category>
    ) { }

    async add_product(data:any){
        try{
            const description: IDescription = {
                title: data['description_title'] || null,
                description: data['description'] || null,
                category_id: data['category_id'] || null,
                price_in: data['price_in'] || null,
                yearly_tax_rate: data['yearly_tax_rate'] || null,
                association_fee: data['association_fee'] || null,
                after_price_label: data['after_price_label'] || null,
                before_price_label: data['before_price_label'] || null,
                property_status: data['property_status'] || null,
            }

            // Save Description
            const descriptionSave = await this.descriptionRepository.save(description)

            const media_list = []
            // Save Media
            for (const file of data['files']) {
                const filename = file['filename']
                const media:IMedia = {
                    image_path: filename,
                    video_path: data['video_path'] || null,
                    virtual_tour: data['virtual_tour'] || null
                }

                const media_save = await this.mediaRepository.save(media)
                media_list.push(media_save)
            }

            const location: ILocation = {
                address: data['address'] || null,
                city: data['city'] || null,
                state: data['state'] || null,
                zip: data['zip'] || null,
                latitude: data['latitude'] || null,
                longitude: data['longitude'] || null,
                country: data['country'] || null,
                neighborhood: data['neighborhood'] || null
            }
            const location_save = await this.locationRepository.save(location)

            const detail: IDetail = {
                size_in_ft: data['size_in_ft'] || null,
                lot_size_in_ft: data['lot_size_in_ft'] || null,
                rooms: data['rooms'] || null,
                bedrooms: data['bedrooms'] || null,
                bathrooms: data['bathrooms'] || null,
                custom_id: data['customID'] || null,
                garages: data['garages'] || null,
                garage_size: data['garage-size'] || null,
                year_built: data['year-built'] || null,
                available_from: data['available-from'] || null,
                basement: data['basement'] || null,
                extra_details: data['extra-detail'] || null,
                roofing: data['roofing'] || null,
                exterior_material: data['exterior-material'] || null,
                structure_type: data['structure-type'] || null,
                agent_nots: data['owner'] || null,
                energy_class: data['energy-class'] || null,
                energy_index: data['energy-index'] || null
            }
            const detail_save = await this.detailRepository.save(detail)
            
            const language = await this.languageRepository.save({language: data['language']})
            const product = new Product()
            product.title = data['description_title']
            product.description = descriptionSave
            product.location = location_save
            product.detail = detail_save
            product.media = media_list
            product.language = language

            const category = await this.categoryRepository.findOne(
                {
                    where:{
                        id: data.category_id
                    }
                }
            )
            product.category = category
            await this.productRepository.save(product)

            return true

        }catch(err){
            console.log(err)
            return;
        }
    }

    async get_all_product(){
        try{
            const products = await this.productRepository.find(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language']
                }
            )
            return products
        }catch(err){
            return;
        }
    }

    async get_all_product_tr(){
        try{
            const products = await this.productRepository.find(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language'],
                    where:{
                        language:{
                            language: 'tr'
                        }
                    }
                }
            )

            return products
        }catch(err){
            return;
        }
    }

    async get_all_product_eng(){
        try{
            const products = await this.productRepository.find(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language'],
                    where:{
                        language:{
                            language: 'en'
                        }
                    }
                }
            )

            return products
        }catch(err){
            return;
        }
    }

    async search_product_global(search_query:string){
        try{
            const products = await this.productRepository.find(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language', 'category'],
                    where: [
                        {
                            location: {
                                address: ILike(`%${search_query}%`)
                            }
                        },
                        {
                            title: ILike(`%${search_query}%`)
                        },
                        {
                            description: {
                                property_status: ILike(`%${search_query}%`)
                            }
                        }
                    ]
                }
            )

            return products
        }catch(err){
            return;
        }
    }

    async search_product_tr(search_query:string){
        try{
            const products = await this.productRepository.find(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language', 'category'],
                    where:[
                        {
                            language: {
                                language: 'tr'
                            },
                        },
                        {
                            location: {
                                address: ILike(`%${search_query}%`)
                            }
                        },
                        {
                            title: ILike(`%${search_query}%`)
                        },
                        {
                            description: {
                                property_status: ILike(`%${search_query}%`)
                            }
                        }
                    ]
                }
            )

            return products
        }catch(err){
            return;
        }
    }

    async search_product_eng(search_query:string){
        try{
            const products = await this.productRepository.find(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language', 'category'],
                    where:[
                        {
                            language: {
                                language: 'en'
                            },
                        },
                        {
                            location: {
                                address: ILike(`%${search_query}%`)
                            }
                        },
                        {
                            title: ILike(`%${search_query}%`)
                        },
                        {
                            description: {
                                property_status: ILike(`%${search_query}%`)
                            }
                        }
                    ]
                }
            )
        }catch(err){
            return;
        }
    }

    async get_product_detail_tr(id:number){
        try{
            const product = await this.productRepository.findOne(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language'],
                    where:{
                        id: id,
                        language:{
                            language: 'tr'
                        }
                    }
                }
            )

            return product
        }catch(err){
            return;
        }
    }

    async get_product_detail_eng(id:number){
        try{
            const product = await this.productRepository.findOne(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language'],
                    where:{
                        id: id,
                        language:{
                            language: 'en'
                        }
                    }
                }
            )

            return product
        }catch(err){
            return;
        }
    }

    async get_product_global(id:number){
        try{
            const product = await this.productRepository.findOne(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language'],
                    where:{
                        id: id
                    }
                }
            )

            return product
        }catch(err){
            return;
        }
    }

    async get_product_delete(id:number):Promise<void>{
        try{
            await this.productRepository.delete(
                {
                    id: id
                }
            )
        }catch(err){
            return;
        }
    }

    async get_product_update(id:number, data:any){
        try{
            const product = await this.productRepository.findOne(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language'],
                    where:{
                        id: id
                    }
                }
            )

            if (!product){
                return;
            }
            
            // Description Update
            const description = await this.descriptionRepository.findOne(
                {
                    where:{
                        id: product.description.id
                    }
                }
            )
            description.title = data['description_title'] || null
            description.description = data['description'] || null
            description.price_in = data['price_in'] || null
            description.yearly_tax_rate = data['yearly_tax_rate'] || null
            description.association_fee = data['association_fee'] || null
            description.after_price_label = data['after_price_label'] || null
            description.before_price_label = data['before_price_label'] || null
            description.property_status = data['property_status'] || null
            await this.descriptionRepository.save(description)

            // Location Update
            const location = await this.locationRepository.findOne(
                {
                    where: {
                        id: product.location.id
                    }
                }
            )
            location.address = data['address'] || null
            location.city = data['city'] || null
            location.state = data['state'] || null
            location.zip = data['zip'] || null
            location.latitude = data['latitude'] || null
            location.longitude = data['longitude'] || null
            location.country = data['country'] || null
            location.neighborhood = data['neighborhood'] || null
            await this.locationRepository.save(location)

            // Detail Update
            const detail = await this.detailRepository.findOne(
                {
                    where:{
                        id: product.detail.id
                    }
                }
            )
            detail.size_in_ft = data['size_in_ft'] || null
            detail.lot_size_in_ft = data['lot_size_in_ft'] || null
            detail.rooms = data['rooms'] || null
            detail.bedrooms = data['bedrooms'] || null
            detail.bathrooms = data['bathrooms'] || null
            detail.custom_id = data['customID'] || null
            detail.garages = data['garages'] || null
            detail.garage_size = data['garage-size'] || null
            detail.year_built = data['year-built'] || null
            detail.available_from = data['available-from'] || null
            detail.basement = data['basement'] || null
            detail.extra_details = data['extra-detail'] || null
            detail.roofing = data['roofing'] || null
            detail.exterior_material = data['exterior-material'] || null
            detail.structure_type = data['structure-type'] || null
            detail.agent_nots = data['owner'] || null
            detail.energy_class = data['energy-class'] || null
            await this.detailRepository.save(detail)

            const language = await this.languageRepository.findOne(
                {
                    where:{
                        id: product.language.id
                    }
                }
            )
            language.language = data['language']
            await this.languageRepository.save(language)

            // Product Update
            product.title = data['description_title']
            product.description = description
            product.location = location
            product.detail = detail
            product.language = language
            await this.productRepository.save(product)
            return true
        }catch(err){
            console.log(err)
            return;
        }
    }

    async product_with_cateogry_tr(name:string){
        try{
            const category = await this.categoryRepository.findOne(
                {
                    where:{
                        name: name
                    }
                }
            )

            const products = await this.productRepository.find(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language', 'category'],
                    where:{
                        category: category,
                        language:{
                            language: 'tr'
                        }
                    }
                }
            )

            return products
        }catch(err){
            return;
        }
    }

    async product_with_cateogry_eng(name:string){
        try{
            const category = await this.categoryRepository.findOne(
                {
                    where:{
                        name: name
                    }
                }
            )

            const products = await this.productRepository.find(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language', 'category'],
                    where:{
                        category: category,
                        language:{
                            language: 'en'
                        }
                    }
                }
            )

            return products
        }catch(err){
            return;
        }
    }
}