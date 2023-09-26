import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch()
export class ErrorInterceptor implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let statusCode = 500
        let message = 'Internal Server Error'

        if (exception instanceof HttpException){
            statusCode = exception.getStatus()
            message = exception.message
        }
        if (statusCode === 403){
            response.redirect(302, '/user/login')
        }
        if (statusCode){
            response.redirect(302, '/')
        }

    }
}