import { Inject, Injectable } from "@nestjs/common";
import { IUser } from "src/database/interface/IUser";
import { User } from "src/database/models/User";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { JwtService } from "src/customService/jwt.service";


@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async register(data:IUser){
        try{
            const user_control = await this.userRepository.findOne(
                {
                    where: {
                        email: data.email
                    }
                }
            )

            if (!user_control){
                // Register
                const password = await bcrypt.hash(data.password, 10)
                data.password = password
                await this.userRepository.save(data)
                return true
            }else{
                throw new Error('User already exists')
            }
        }catch(err){
            console.log(err)
            return;
        }
    }

    async login(data:any){
        try{
            const user = await this.userRepository.findOne(
                {
                    where: {
                        email: data.email
                    }
                }
            )

            if (user){
                const password_control = await bcrypt.compare(data.password, user.password)
                if (password_control){
                    const token = this.jwtService.generateToken({id: user.id})
                    return token
                }else{
                    throw new Error('Password is incorrect')
                }
            }else{
                throw new Error('User not found')
            }
        }catch(err){
            return;
        }
    }

}