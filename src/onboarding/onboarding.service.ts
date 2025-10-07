import { Injectable, NotFoundException } from '@nestjs/common';
import { addDays } from 'date-fns';

import { CreateRegisterDto } from 'src/onboarding/dto/create-register.dto';
import { EmpresaService } from 'src/empresa/empresa.service';
import { UserService } from 'src/user/user.service';
import { PlanService } from 'src/plan/plan.service';
import { SuscripcionService } from 'src/suscripcion/suscripcion.service';
import { RolService } from 'src/rol/rol.service';
import { Role } from 'src/rol/enums/role.enum';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly empresaService: EmpresaService,
    private readonly userService: UserService,
    private readonly planService: PlanService,
    private readonly suscripcionService: SuscripcionService,
    private readonly rolService: RolService,
  ) {}

  /**
   * Flujo de registro de una empresa con su usuario propietario
   */
  async create(dto: CreateRegisterDto) {
    // 1️⃣ Crear la empresa
    const company = await this.empresaService.create({
      trade_name: dto.trade_name,
      legal_name: dto.legal_name,
      email: dto.email,
      phone_number: dto.phone_number,
      logo: dto.logo_url,
      address: dto.address,
    });

    // 2️⃣ Buscar el plan
    const plan = await this.planService.findOne(dto.plan_id);
    if (!plan) throw new NotFoundException('Invalid Plan ID');

    // 3️⃣ Crear la suscripción inicial
    const suscripcion = await this.suscripcionService.create({
      company_id: company.id,
      plan_id: plan.id,
      start_date: new Date(),
      end_date: addDays(new Date(), plan.duration_days),
    });

    // 4️⃣ Obtener el rol “COMPANY_OWNER”
    const role = await this.rolService.findByName(Role.COMPANY_OWNER);
    if (!role) throw new NotFoundException('Role COMPANY_OWNER not found');

    // 5️⃣ Crear el usuario propietario
    const user = await this.userService.create({
  email: dto.email,
  first_name: dto.name,
  last_name: dto.last_name || 'Owner',
  password: dto.password,
  role_id: role.id,
  company_id: company.id,
  profile_image_url: dto.profile_image_url || null,
  employee_id: null, // si aplica
});

    return {
      message: 'Company and owner registered successfully',
      company,
      user,
      suscripcion,
    };
  }
}