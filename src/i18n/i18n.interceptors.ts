import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import * as secureSession from 'fastify-secure-session'
import { I18nService } from "nestjs-i18n";

@Injectable()
export class I18nInterceptors implements NestInterceptor {
    constructor(
        private readonly i18nService: I18nService
    ) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        const lang = request.cookies.lang || 'tr';

        response.locals.__ = this.i18nService.t('index', { lang: lang })
        return next.handle();
    }
}