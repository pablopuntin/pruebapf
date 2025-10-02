import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/empleado.entity';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Departamento } from '../departamento/entities/departamento.entity';
import { Position } from '../position/entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Departamento, Position])],
  controllers: [EmpleadoController],
  providers: [EmpleadoService]
})
export class EmpleadoModule {}
