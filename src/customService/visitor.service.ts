import { Inject, Injectable } from "@nestjs/common";
import { Visitor } from "src/database/models/Visitor";
import { Repository } from "typeorm";

@Injectable()
export class VisitorService {
    constructor(@Inject('VISITOR_REPOSITORY') private visitorRepository: Repository<Visitor>){
        this.incremenetVisitorCount()
    }

    async incremenetVisitorCount(): Promise<void> {
        try{
            const visitor = await this.visitorRepository.findOne({
                where:{
                    id: 1
                }
            })

            if (visitor){
                visitor.count += 1;
                await this.visitorRepository.update(1, visitor);
            }else{
                await this.visitorRepository.save({count: 1})
            }
            
        }catch(err){
            console.log(err)
            return;
        }
    }

    async get_visitors(){
        try{
            const visitors = await this.visitorRepository.findOne(
                {
                    where: {
                        id: 1
                    }
                }
            )
            return visitors
        }catch(err){
            return;
        }
    }
}