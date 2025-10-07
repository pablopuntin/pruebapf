import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
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
    private readonly employeesRepository: Repository<Employee>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role_id, company_id } = createUserDto;

    // 🔹 Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // 🔹 Validar rol
    const role = await this.rolesRepository.findOne({ where: { id: role_id } });
    if (!role) throw new NotFoundException('Invalid Role ID');

    // 🔹 Validar empresa (opcional)
    let company: Company | undefined;
    if (company_id) {
      const foundCompany = await this.companiesRepository.findOne({ where: { id: company_id } });
      if (!foundCompany) throw new NotFoundException('Invalid Company ID');
      company = foundCompany;
    }

    // 🔹 Crear nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      profile_image_url: createUserDto.profile_image_url ?? undefined,
      role,
      company, // ✅ undefined en vez de null
      password: hashedPassword, // asegúrate de que la entidad tenga `@Column() password: string;`
      created_at: new Date(),
      updated_at: new Date(),
    });

    // 🔹 Guardar y devolver usuario
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role', 'company', 'employee'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'company', 'employee'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto, { updated_at: new Date() });
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
