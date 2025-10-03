// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';

import { AppController } from './app.controller';
import { EmpresaModule } from './empresa/empresa.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { PlanModule } from './plan/plan.module';
import { RolModule } from './rol/rol.module';
import { PositionModule } from './position/position.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig
    }),
    EmpresaModule,
    EmpleadoModule,
    DepartamentoModule,
    SuscripcionModule,
    PlanModule,
    RolModule,
    PositionModule,
    AuthModule
    // ...otros módulos
  ],
  controllers: [AppController]
})
export class AppModule {}
