// src/empleado/empleado.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/empleado.entity';
import { CreateEmployeeDto } from './dto/create-empleado.dto';
import { UpdateEmployeeDto } from './dto/update-empleado.dto';
import { SearchEmpleadoDto } from './dto/search-empleado.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>
  ) {}

  //funcion para calcular edad
  private calculateAge(birthdate: Date): number {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

//   async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
//   try {
//   const employee = this.employeeRepository.create(createEmployeeDto);
//     return await this.employeeRepository.save(employee);
//   } catch (error) {
//     // Puedes loguear el error si lo necesitas
//     console.error('Error al crear empleado:', error);

//     // Lanzar una excepción HTTP con un mensaje personalizado
//   throw new InternalServerErrorException('No se pudo crear el empleado');
//   }
// }

//tomando user.company de la request 
async create(createEmployeeDto: CreateEmployeeDto, user: User): Promise<Employee> {
  try {
   const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      //company: user.company, // multi-tenant seguro
      user: user,            // relación uno a uno con el user autenticado
    });

    return await this.employeeRepository.save(employee);
  } catch (error) {
    throw new InternalServerErrorException('No se pudo crear el empleado');
  }
}


  // async findAll(): Promise<Employee[]> {
  //   return this.employeeRepository.find();
  // }
  //con age dinamico
  async findAll(): Promise<(Employee & { age?: number })[]> {
  const employees = await this.employeeRepository.find();
  return employees.map(emp => ({
    ...emp,
    age: emp.birthdate ? this.calculateAge(emp.birthdate) : undefined,
  }));
}



  // async findOne(id: string): Promise<Employee> {
  //   const employee = await this.employeeRepository.findOne({ where: { id } });
  //   if (!employee) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
  //   return employee;
  // }

  //funcion con edad dinamica
async findOne(id: string): Promise<Employee & { age?: number }> {
  const employee = await this.employeeRepository.findOne({ where: { id } });
  if (!employee) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);

  const age = employee.birthdate ? this.calculateAge(employee.birthdate) : undefined;

  return { ...employee, age };
}

//probando busqueda por id, dni o last_name
//    async search(searchDto: SearchEmpleadoDto): Promise<Employee[]> {
//   const { id, dni, last_name } = searchDto;

//   const where: any = {};

//   if (id) where.id = id;
//   if (dni) where.dni = dni;
//   if (last_name) where.last_name = last_name;

//   const employees = await this.employeeRepository.find({
//     where,
//     relations: ['company', 'department', 'user'], // ajusta según tu entidad
//   });

//   if (!employees || employees.length === 0) {
//     throw new NotFoundException('No se encontraron empleados con esos criterios');
//   }

//   return employees;
// }
//con age dinamico
async search(searchDto: SearchEmpleadoDto): Promise<(Employee & { age?: number })[]> {
  const { id, dni, last_name } = searchDto;
  const where: any = {};

  if (id) where.id = id;
  if (dni) where.dni = dni;
  if (last_name) where.last_name = last_name;

  const employees = await this.employeeRepository.find({
    where,
    relations: ['company', 'department', 'user'],
  });

  if (!employees || employees.length === 0) {
    throw new NotFoundException('No se encontraron empleados con esos criterios');
  }

  return employees.map(emp => ({
    ...emp,
    age: emp.birthdate ? this.calculateAge(emp.birthdate) : undefined,
  }));
}

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.employeeRepository.softDelete(id);
  }

  

}
