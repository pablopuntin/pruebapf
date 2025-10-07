import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';
import { DEPARTAMENTOS_BASE } from './data/departamento.data';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>
  ) {}

  async create(
    createDepartamentoDto: CreateDepartamentoDto
  ): Promise<Departamento> {
    const departamento = this.departamentoRepository.create(
      createDepartamentoDto
    );
    return await this.departamentoRepository.save(departamento);
  }

  async findAll(): Promise<Departamento[]> {
    return await this.departamentoRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Departamento> {
    const departamento = await this.departamentoRepository.findOne({
      where: { id }
    });

    if (!departamento) {
      throw new Error('Departamento no encontrado');
    }

    return departamento;
  }

  async update(
    id: string,
    updateDepartamentoDto: UpdateDepartamentoDto
  ): Promise<Departamento> {
    await this.departamentoRepository.update(id, updateDepartamentoDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.departamentoRepository.softDelete(id);
  }

  async seedDepartamentos(): Promise<void> {
    for (const depData of DEPARTAMENTOS_BASE) {
      const existing = await this.departamentoRepo.findOne({
        where: { nombre: ILike(depData.nombre) }, // 👈 case-insensitive
      });
      if (!existing) {
        const nuevo = this.departamentoRepo.create(depData);
        await this.departamentoRepo.save(nuevo);
      }
    }
    console.log('✅ Departamentos precargados correctamente');
  }

  async findByName(nombre: string): Promise<Departamento | null> {
    return this.departamentoRepo.findOne({ where: { nombre: ILike(nombre) } });
  }

}
