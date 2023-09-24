import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/database/models/Category";
import { Language } from "src/database/models/Language";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @Inject('CATEGORY_REPOSITORY') private categoryRepository: Repository<Category>,
        @Inject('LANGUAGE_REPOSITORY') private languageRepository: Repository<Language>
        ) {}
    async add_category(data:any){
        try{

            const language = new Language()
            language.language = data.language
            await this.languageRepository.save(language)

            const category = new Category()
            category.name = data.name
            category.language = language
            const save = await this.categoryRepository.save(category)
            return save

        }catch(err){
            return ;
        }
    }

    async get_all_category(){
        const categories = await this.categoryRepository.find(
            {
                relations:{
                    language: true
                }
            }
        )
        return categories
    }

    async get_all_category_tr(){
        const categories = await this.categoryRepository.find(
            {
                relations:{
                    language: true
                },
                where:{
                    language:{
                        language: 'tr'
                    }
                }
            }
        )
        return categories
    }

    async get_all_category_eng(){
        const categories = await this.categoryRepository.find(
            {
                relations:{
                    language: true
                },
                where:{
                    language:{
                        language: 'en'
                    }
                }
            }
        )
        return categories
    }

    async delete_category(id:number): Promise<void>{
        try{
            await this.categoryRepository.delete(id)

        }catch(err){
            console.log(err)
            return;
        }
    }
}