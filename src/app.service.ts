import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { PlanService } from './plan/plan.service';
import { RolService } from './rol/rol.service';

//-------------------------------------------------//
@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private readonly planService: PlanService,
    private readonly rolService: RolService
  ) {}

  //-------Precarga de Planes y Roles-------//
  async onApplicationBootstrap() {
    console.log('Realizando precarga de datos...');

    try {
      // Llamada a plan/seeder
      console.log(`Precargando planes...`);
      await this.planService.seeder();
      console.log(`Planes precargados exitosamente`);

      // Llamada a rol/seeder
      console.log(`Precargando roles...`);
      await this.rolService.seeder();
      console.log(`Roles precargados exitosamente`);
    } catch (error) {
      console.error(
        'Una de las llamadas falló. La segunda llamada no se ejecutó si la primera falló.',
        error
      );
    }
  }

  //-------------Mensaje de Bienvenida-------------//

  getHello(): string {
    return 'BIENVENIDOS A HR SYSTEM';
  }
}
