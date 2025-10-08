import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/empleado.entity';
import { CreateEmployeeDto } from './dto/create-empleado.dto';
import { UpdateEmployeeDto } from './dto/update-empleado.dto';
import { SearchEmpleadoDto } from './dto/search-empleado.dto';
import { User } from 'src/user/entities/user.entity';
import { Absence } from 'src/absence/entities/absence.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  // ---- Calcular edad ----
  private calculateAge(birthdate: Date): number {
    if (!birthdate || isNaN(new Date(birthdate).getTime())) return 0;
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  // ---- Crear empleado (multi-tenant) ----
  async create(createEmployeeDto: CreateEmployeeDto, user: User): Promise<Employee> {
    try {
      const employee = this.employeeRepository.create({
        ...createEmployeeDto,
        company: user.company, // multi-tenant seguro
        user: user,            // relación uno a uno con el user autenticado
      });

      return await this.employeeRepository.save(employee);
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el empleado');
    }
  }

  // ---- Listar todos (multi-tenant + edad dinámica) ----
  async findAll(authUser: User): Promise<(Employee & { age?: number })[]> {
    const company = authUser.company;
    if (!company) {
      throw new InternalServerErrorException('User has no associated company');
    }

    const employees = await this.employeeRepository.find({
      where: { company: { id: company.id } },
      relations: ['company', 'department', 'user'],
    });

    return employees.map(emp => ({
      ...emp,
      age: emp.birthdate ? this.calculateAge(emp.birthdate) : undefined,
    }));
  }

  // ---- Buscar por ID (multi-tenant + edad) ----
  async findOne(id: string, authUser: User): Promise<Employee & { age?: number }> {
    const company = authUser.company;
    if (!company) {
      throw new InternalServerErrorException('User has no associated company');
    }

    const employee = await this.employeeRepository.findOne({
      where: { id, company: { id: company.id } },
      relations: ['company', 'department', 'user'],
    });

    if (!employee) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);

    const age = employee.birthdate ? this.calculateAge(employee.birthdate) : undefined;
    return { ...employee, age };
  }

  // ---- Búsqueda dinámica (multi-tenant + edad) ----
  async search(authUser: User, searchDto: SearchEmpleadoDto): Promise<(Employee & { age?: number })[]> {
    const company = authUser.company;
    if (!company) {
      throw new InternalServerErrorException('User has no associated company');
    }

    const { id, dni, last_name } = searchDto;
    const where: any = { company: { id: company.id } };

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

  // ---- Actualizar empleado ----
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto, authUser: User): Promise<Employee> {
    const company = authUser.company;
    if (!company) {
      throw new InternalServerErrorException('User has no associated company');
    }

    await this.employeeRepository.update({ id, company: { id: company.id } }, updateEmployeeDto);
    return this.findOne(id, authUser);
  }

  // ---- Eliminado lógico ----
  async remove(id: string, authUser: User): Promise<void> {
    const company = authUser.company;
    if (!company) {
      throw new InternalServerErrorException('User has no associated company');
    }

    await this.employeeRepository.softDelete({ id, company: { id: company.id } });
  }

  async getAusenciasByEmpleado(
  employeeId: string,
  authUser: User,
  month?: number,
  year?: number
): Promise<Absence[]> {
  const companyId = authUser.company?.id;
  if (!companyId) {
    throw new InternalServerErrorException('User has no associated company');
  }

  // Verificamos que el empleado pertenezca a la empresa
  const empleado = await this.employeeRepository.findOne({
    where: { id: employeeId, company: { id: companyId } },
    relations: ['absences'],
  });

  if (!empleado) {
    throw new NotFoundException('Empleado no encontrado en tu empresa');
  }

  // Determinar mes y año actual si no se pasan
  const now = new Date();
  const targetMonth = month ?? now.getMonth() + 1; // getMonth() es 0-indexed
  const targetYear = year ?? now.getFullYear();

  // Filtrar ausencias por mes y año
  const ausenciasFiltradas = empleado.absences.filter((ausencia) => {
   const fecha = new Date(ausencia.start_date);
    return (
      fecha.getMonth() + 1 === targetMonth &&
      fecha.getFullYear() === targetYear
    );
  });

  return ausenciasFiltradas;
}

}
