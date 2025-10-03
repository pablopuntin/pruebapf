import { Injectable } from '@nestjs/common';
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

    return {
      id: savedPlan.id,
      name: savedPlan.name,
      price: savedPlan.price,
      duration_days: savedPlan.duration_days,
      createdAt: savedPlan.createdAt,
      updatedAt: savedPlan.updatedAt
    };
  }

  async findAll(): Promise<PlanResponseDto[]> {
    const plans = await this.planRepository.find({
      order: { createdAt: 'DESC' }
    });

    return plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      duration_days: plan.duration_days,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt
    }));
  }

  async seeder() {
    //Leer data y guardarla en la DB
    await this.planRepository.upsert(plans_data, ['name']);

    return { message: 'Plans added successfully.' };
  }

  async findOne(id: string): Promise<PlanResponseDto> {
    const plan = await this.planRepository.findOne({
      where: { id }
    });

    if (!plan) {
      throw new Error('Plan no encontrado');
    }

    return {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      duration_days: plan.duration_days,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt
    };
  }

  async update(
    id: string,
    updatePlanDto: UpdatePlanDto
  ): Promise<PlanResponseDto> {
    await this.planRepository.update(id, updatePlanDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.planRepository.softDelete(id);
  }
}
