import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://front-one-umber.vercel.app',
      'https://front-git-main-hr-systems-projects.vercel.app', // ← agregá este
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  // ⚠️ Stripe necesita el cuerpo crudo para validar la firma
  app.use('/payments/stripe/webhook', bodyParser.raw({ type: '*/*' }));
    // Necesario para Stripe webhook
  app.use('/webhook', json({ verify: (req: any, res, buf) => (req.rawBody = buf) }));
  

  // Activar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan propiedades extra
      transform: true // transforma tipos automáticamente (ej: string -> number)
    })
  );

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
