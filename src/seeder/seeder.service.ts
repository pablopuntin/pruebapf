import { Injectable, OnModuleInit } from '@nestjs/common';
import { DepartamentoService } from 'src/departamento/departamento.service';
import { PositionService } from 'src/position/position.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly departamentoService: DepartamentoService,
    private readonly positionService: PositionService,
  ) {}

  async onModuleInit() {
    console.log('🚀 Ejecutando seeder automático...');
    await this.departamentoService.seedDepartamentos();
    await this.positionService.seedPositions();
    console.log('🌱 Seeder completado.');
  }
}
