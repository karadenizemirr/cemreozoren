import { Inject, Injectable } from "@nestjs/common";
import { Location } from "src/database/models/product/Location";
import { Repository } from "typeorm";

@Injectable()
export class LocationService {
    constructor(
        @Inject('LOCATION_REPOSITORY') private locationRepository: Repository<Location>
    ) {}

    async get_all_location(){
        try{
            const locations = await this.locationRepository.find()
            return locations
        }catch(err){
            return;
        }
    }
}