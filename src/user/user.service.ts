import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Rol } from 'src/rol/entities/rol.entity';
import { Company } from 'src/empresa/entities/empresa.entity';
import { Employee } from 'src/empleado/entities/empleado.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rol)
    private readonly rolesRepository: Repository<Rol>,
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });

    if (userFound) {
      throw new ConflictException('Email already exist.');
    }

    //Buscar rol
    const rol = await this.rolesRepository.findOne({
      where: { id: createUserDto.role_id }
    });

    if (!rol) {
      throw new NotFoundException('Invalid Rol ID');
    }

    //Buscar empresa
    let company: Company | null = null;
    if (createUserDto.company_id) {
      company = await this.companiesRepository.findOne({
        where: { id: createUserDto.company_id }
      });

      if (!company) {
        throw new NotFoundException('Invalid Company ID');
      }
    }

    //Buscar empleado
    let employee: Employee | null = null;
    if (createUserDto.employee_id) {
      employee = await this.employeesRepository.findOne({
        where: { id: createUserDto.employee_id }
      });

      if (!employee) {
        throw new NotFoundException('Invalid Employee ID');
      }
    }
    //Creacion y carga de user en DB
    const newUser = new User();
    newUser.role = rol;
    newUser.email = createUserDto.email;

    if (company) {
      newUser.company = company;
    }
    if (employee) {
      newUser.employee = employee;
    }
    newUser.first_name = createUserDto.first_name;
    newUser.last_name = createUserDto.last_name;
    newUser.profile_image_url = createUserDto.profile_image_url;
    newUser.created_at = new Date();
    newUser.updated_at = new Date();

    await this.userRepository.save(newUser);

    return 'User add sucssesfully';
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'company', 'employee']
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user as User;
  }

  async findByClerkId(clerkId: string) {
    return this.userRepository.findOne({
      where: { clerkId: clerkId },
      relations: ['company', 'role']
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
