import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { config as auth0Config } from './config/auth0.config';
import { auth } from 'express-openid-connect';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //-----Configuracion de Auth0------//
  app.use(auth(auth0Config));

  const server = app.getHttpAdapter().getInstance();

  //Borra la cookie local y hace logout en Auth0
  server.get('/logout', (req, res) => {
    res.oidc.logout({
      returnTo: 'https://front-git-main-hr-systems-projects.vercel.app'
    });
  });

  // Activar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan propiedades extra
      transform: true // transforma tipos automáticamente (ej: string -> number)
    })
  );

  app.enableCors({
    origin: [
      'https://front-one-umber.vercel.app',
      'https://front-git-main-hr-systems-projects.vercel.app', // ← agregá este
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });

  const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('HR System API')
    .setDescription('Proyecto final Henry')
    .setVersion('1.0')
    .addTag('tag')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('HR', app, document);
  const port = configService.get<number>('PORT', 4000);
  await app.listen(port);
  console.log(`🚀 App running on http://localhost:${port}`);
}
bootstrap();
