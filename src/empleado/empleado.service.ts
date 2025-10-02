// src/empleado/empleado.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/empleado.entity';
import { CreateEmployeeDto } from './dto/create-empleado.dto';
import { UpdateEmployeeDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.employeeRepository.softDelete(id);
  }
}
