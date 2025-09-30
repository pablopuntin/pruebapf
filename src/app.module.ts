import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EmpresaModule } from './empresa/empresa.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { CategoriasModule } from './categorias/categorias.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 hace que esté disponible en todo el proyecto
    }),
    EmpresaModule,
    EmpleadoModule,
    CategoriasModule,
    SuscripcionModule,
    // ...otros módulos
  ],
  controllers: [AppController]
})
export class AppModule {}
