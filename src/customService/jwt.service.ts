import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtService {
    private secret_key = "secret_key"
    constructor() { }

    async generateToken(data: any) {
        return jwt.sign(data, this.secret_key)
    }

    async verify_token(token: string) {
        return jwt.verify(token, this.secret_key)
    }
    
}