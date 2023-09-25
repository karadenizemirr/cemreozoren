import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';
import fastyfyMultipart from '@fastify/multipart';
import secureSession from '@fastify/secure-session';
import * as cookieParser from 'cookie-parser';
import Handlebars from 'handlebars';

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
  await app.listen(process.env.PORT ?? 3000, process.env.HOST || '0.0.0.0');
}
bootstrap();