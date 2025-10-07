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
import { AuthModule } from './auth/auth,module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';


//--------------SEEDER----------------//
import { AppService } from './app.service';
import { PlanService } from './plan/plan.service';
import { RolService } from './rol/rol.service';
import { Plan } from './plan/entities/plan.entity';
import { Rol } from './rol/entities/rol.entity';
import { SeederModule } from './seeder/seeder.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

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
    AuthModule,
    UserModule,
    ContactModule,
    TypeOrmModule.forFeature([Plan, Rol]),
    SeederModule
    // ...otros módulos
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, PlanService, RolService, AuthService]
})
export class AppModule {}
