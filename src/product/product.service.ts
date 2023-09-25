import { Inject, Injectable } from "@nestjs/common";
import { IAmenitlies } from "src/database/interface/IAmenitlies";
import { IDescription } from "src/database/interface/IDescription";
import { IDetail } from "src/database/interface/IDetail";
import { ILocation } from "src/database/interface/ILocation";
import { IMedia } from "src/database/interface/IMedia";
import { Language } from "src/database/models/Language";
import { Description } from "src/database/models/product/Description";
import { Detail } from "src/database/models/product/Detail";
import { Location } from "src/database/models/product/Location";
import { Media } from "src/database/models/product/Media";
import { Product } from "src/database/models/product/Product";
import { Like, Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @Inject('DESCRIPTION_REPOSITORY') private descriptionRepository: Repository<Description>,
        @Inject('MEDIA_REPOSITORY') private mediaRepository: Repository<Media>,
        @Inject('LOCATION_REPOSITORY') private locationRepository: Repository<Location>,
        @Inject('DETAIL_REPOSITORY') private detailRepository: Repository<Detail>,
        @Inject('PRODUCT_REPOSITORY') private productRepository: Repository<Product>,
        @Inject('LANGUAGE_REPOSITORY') private languageRepository: Repository<Language>
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

    async search_product_tr(search_query:string){
        try{
            const products = await this.productRepository.find(
                {
                    relations: ['description', 'location', 'detail', 'media', 'language'],
                    where:[
                        {
                            language: {
                                language: 'tr'
                            },
                        },
                        {
                            location: {
                                address: Like(`%${search_query}%`)
                            }
                        },
                        {
                            title: Like(`%${search_query}%`)
                        },
                        {
                            description: {
                                property_status: Like(`%${search_query}%`)
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
            const products = await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.description', 'description')
            .leftJoinAndSelect('product.location', 'location')
            .leftJoinAndSelect('product.detail', 'detail')
            .where('language.language = :lang', {lang: 'en'})
            .andWhere('description.title LIKE :search', {search: `%${search_query}%`})
            .getMany()

            return products
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
}