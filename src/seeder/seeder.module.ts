import { Module } from '@nestjs/common';
import { DepartamentoModule } from 'src/departamento/departamento.module';
import { PositionModule } from 'src/position/position.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [DepartamentoModule, PositionModule],
  providers: [SeederService]
})
export class SeederModule {}
