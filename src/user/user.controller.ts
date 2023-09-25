import { Body, Controller, Get, Post, Render, Res, Session } from "@nestjs/common";
import { IUser } from "src/database/interface/IUser";
import { UserService } from "./user.service";
import { Response, response } from "express";
import * as secureSession from '@fastify/secure-session'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('register')
    async get_register(){
        return {
            title: "Register"
        }
    }

    @Post('register')
    async post_register(@Body() body:IUser, @Res() response:Response){
        const user = await this.userService.register(body)

        if (user){
            response.redirect(302, '/user/login')
        }
        response.redirect(302, '/user/register')
    }

    @Get('login')
    @Render('login')
    async get_login(){
        return {
            title: 'Login'
        }
    }

    @Post('login')
    async post_login(@Body() body:any, @Session() session:secureSession.Session, @Res() response:Response){
        const token = await this.userService.login(body)

        if (token){
            session.set('token', token)
            response.redirect(302, '/dashboard')
        }

        response.redirect(302, '/user/login')
    }

    @Get('logout')
    async get_logout(@Session() session:secureSession.Session, @Res() response: Response){
        session.delete()
        response.redirect(302, '/')

    }
}