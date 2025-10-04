// src/empleado/empleado.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
  try {
  const employee = this.employeeRepository.create(createEmployeeDto);
    return await this.employeeRepository.save(employee);
  } catch (error) {
    // Puedes loguear el error si lo necesitas
    console.error('Error al crear empleado:', error);

    // Lanzar una excepción HTTP con un mensaje personalizado
  throw new InternalServerErrorException('No se pudo crear el empleado');
  }
}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    return employee;
  }

  //probando busqueda por id, dni o last_name
  async findByDni(dni: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { dni },
      relations: ['company', 'plan'],
    });
    if (!employee) {
      throw new NotFoundException(`Suscripción con DNI ${dni} no encontrada`);
    }
    return employee;
  }

  async findByLastName(lastName: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { last_name: lastName },
      relations: ['company', 'plan'],
    });
    if (!employee) {
      throw new NotFoundException(
        `Suscripción con apellido "${lastName}" no encontrada`,
      );
    }
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
