import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';
import fastyfyMultipart from '@fastify/multipart';
import secureSession from '@fastify/secure-session';
import * as cookieParser from 'cookie-parser';
import Handlebars from 'handlebars';
import { ErrorInterceptor } from './customService/error.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'src/assets/public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'src/assets/views'),
    layout: 'partials/layout'
  });

  Handlebars.registerHelper('isSelected', function (a, b) {
    if (a == b) {
      return 'selected'
    }

    return ''
  })

  Handlebars.registerHelper('eq', function (a, b, options) {
    if (a == b) {
      return options.fn(this)
    }

    return options.inverse(this)
  })

  Handlebars.registerHelper('lookup', function (obj, index, property) {
    return obj[index][property];
  });


  app.register(fastyfyMultipart);
  await app.register(secureSession, {
    secret: 'averylogphrasebiggerthanthirtytwochars',
    salt: 'mq9hDxBVDbspDR6n',
    cookieName: 'realestate',
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 // 7 days
    }
  });
  app.use(cookieParser());
  app.useGlobalFilters(new ErrorInterceptor());
  await app.listen(process.env.PORT ?? 3000, process.env.HOST || '0.0.0.0');
}
bootstrap();