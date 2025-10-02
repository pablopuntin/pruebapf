import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscripcionService } from './suscripcion.service';
import { SuscripcionController } from './suscripcion.controller';
import { Suscripcion } from './entities/suscripcion.entity';
import { Plan } from '../plan/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suscripcion, Plan])],
  controllers: [SuscripcionController],
  providers: [SuscripcionService],
  exports: [SuscripcionService]
})
export class SuscripcionModule {}
