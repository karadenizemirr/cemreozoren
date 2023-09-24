import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { CategoryAdminModule } from './category/admin/category.admin.module';
import { languageProviders } from './database/providers/language.provider';
import { ProductAdminModule } from './product/admin/product.admin.module';
import { CookieResolver, HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { CategoryService } from './category/category.service';
import { categoryProviders } from './database/providers/category.providers';
import { I18nInterceptors } from './i18n/i18n.interceptors';
import { ProductModule } from './product/product.module';
import { LocationService } from './location/location.service';
import { locationProviders } from './database/providers/product/location.providers';

@Global()
@Module({
  imports: [
    I18nModule.forRoot(
      {
        fallbackLanguage: 'tr',
        fallbacks: {
          'en-US': 'en',
          'tr-TR': 'tr'
        },
        loaderOptions: {
          path: path.join(__dirname, '..','src/i18n/'),
          warch: true
        },
        resolvers: [
          new CookieResolver()
        ]
      }
    ),
    DatabaseModule,
    CategoryAdminModule,
    ProductAdminModule,
    RouterModule.register([
      {
        path: 'admin',
        module: CategoryAdminModule
      },
      {
        path: 'admin',
        module: ProductAdminModule
      }
    ]),
    ProductModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...languageProviders,
    CategoryService,
    ...categoryProviders,
    {
      provide: APP_INTERCEPTOR,
      useClass: I18nInterceptors
    },
    LocationService, ...locationProviders
  ],
  exports: [DatabaseModule,...languageProviders]
})
export class AppModule {}