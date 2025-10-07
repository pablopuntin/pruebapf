import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanResponseDto } from './dto/plan-response.dto';
import { Plan } from './entities/plan.entity';
import { plans_data } from './data/plan.data';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<PlanResponseDto> {
    const plan = this.planRepository.create(createPlanDto);
    const savedPlan = await this.planRepository.save(plan);

    return this.toDto(savedPlan);
  }

  async findAll(): Promise<PlanResponseDto[]> {
    const plans = await this.planRepository.find({
      order: { createdAt: 'DESC' },
    });

    return plans.map(this.toDto);
  }

  async seeder() {
    await this.planRepository.upsert(plans_data, ['name']);
    return { message: 'Plans added successfully.' };
  }

  async findOne(id: string): Promise<PlanResponseDto> {
    const plan = await this.planRepository.findOne({ where: { id } });
    if (!plan) throw new NotFoundException('Plan no encontrado');
    return this.toDto(plan);
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<PlanResponseDto> {
    const plan = await this.findOne(id); // lanzará NotFoundException si no existe
    Object.assign(plan, updatePlanDto);
    return this.toDto(await this.planRepository.save(plan));
  }

  async remove(id: string): Promise<void> {
    await this.planRepository.softDelete(id);
  }

  private toDto(plan: Plan): PlanResponseDto {
    return {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      duration_days: plan.duration_days,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    };
  }
}
