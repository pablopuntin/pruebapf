import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { Position } from './entities/position.entity';
import { DepartamentoModule } from 'src/departamento/departamento.module';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), DepartamentoModule],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService]
})
export class PositionModule {}
