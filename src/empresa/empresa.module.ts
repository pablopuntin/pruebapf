import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/empresa.entity';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [EmpresaController],
  providers: [EmpresaService]
})
export class EmpresaModule {}
