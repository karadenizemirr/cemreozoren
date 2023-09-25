import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import * as secureSession from 'fastify-secure-session'

@Injectable()
export class AuthLogin implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    
        const res = context.switchToHttp().getResponse()
        const req = context.switchToHttp().getRequest()
        const token = req.session as secureSession.Session
        let isLogin = false

        if (token && token['token']){
            isLogin = true
        }

        res.locals.isLogin = isLogin
        return next.handle()
    }
}