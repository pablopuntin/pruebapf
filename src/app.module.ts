import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { EmpresaModule } from './empresa/empresa.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';
import { DepartamentoModule } from './departamento/departamento.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT') || 5432,
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        ssl: config.get('DATABASE_URL') ? { rejectUnauthorized: false } : false,
        autoLoadEntities: true,
        synchronize: false, // ⚠️ no usar true en producción
      })
    }),
    EmpresaModule,
    EmpleadoModule,
    DepartamentoModule,
    SuscripcionModule
  ],
  controllers: [AppController]
})
export class AppModule {}
