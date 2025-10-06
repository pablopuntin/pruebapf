import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Absence } from './entities/absence.entity';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectRepository(Absence)
    private readonly absenceRepository: Repository<Absence>
  ) {}

  async create(createAbsenceDto: CreateAbsenceDto): Promise<Absence> {
    const absence = this.absenceRepository.create(createAbsenceDto);
    return await this.absenceRepository.save(absence);
  }

  async findAll(): Promise<Absence[]> {
    return await this.absenceRepository.find({
      relations: ['employee']
    });
  }

  async findByEmployee(employeeId: string): Promise<Absence[]> {
    return await this.absenceRepository.find({
      where: { employee_id: employeeId },
      relations: ['employee']
    });
  }

  async findOne(id: string): Promise<Absence> {
    const absence = await this.absenceRepository.findOne({
      where: { id },
      relations: ['employee']
    });

    if (!absence) {
      throw new NotFoundException('Ausencia no encontrada');
    }

    return absence;
  }

  async update(id: string, updateAbsenceDto: UpdateAbsenceDto): Promise<Absence> {
    const absence = await this.findOne(id);
    
    Object.assign(absence, updateAbsenceDto);
    return await this.absenceRepository.save(absence);
  }

  async remove(id: string): Promise<void> {
    const absence = await this.findOne(id);
    await this.absenceRepository.remove(absence);
  }
}
