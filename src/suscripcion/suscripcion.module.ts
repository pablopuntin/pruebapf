import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscripcionService } from './suscripcion.service';
import { SuscripcionController } from './suscripcion.controller';
import { Suscripcion } from './entities/suscripcion.entity';
import { Plan } from '../plan/entities/plan.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Suscripcion, Plan]), NotificationsModule],
  controllers: [SuscripcionController],
  providers: [SuscripcionService],
  exports: [SuscripcionService]
})
export class SuscripcionModule {}
