// import { ConflictException, Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { NotFoundException } from '@nestjs/common';
// import { Rol } from 'src/rol/entities/rol.entity';
// import { Company } from 'src/empresa/entities/empresa.entity';
// import { Employee } from 'src/empleado/entities/empleado.entity';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//     @InjectRepository(Rol)
//     private readonly rolesRepository: Repository<Rol>,
//     @InjectRepository(Company)
//     private readonly companiesRepository: Repository<Company>,
//     @InjectRepository(Employee)
//     private readonly employeesRepository: Repository<Employee>
//   ) {}

//   async create(createUserDto: CreateUserDto) {
//     const userFound = await this.userRepository.findOne({
//       where: { email: createUserDto.email }
//     });

//     if (userFound) {
//       throw new ConflictException('Email already exist.');
//     }

//     //Buscar rol
//     const rol = await this.rolesRepository.findOne({
//       where: { id: createUserDto.role_id }
//     });

//     if (!rol) {
//       throw new NotFoundException('Invalid Rol ID');
//     }

//     //Buscar empresa
//     let company: Company | null = null;
//     if (createUserDto.company_id) {
//       company = await this.companiesRepository.findOne({
//         where: { id: createUserDto.company_id }
//       });

//       if (!company) {
//         throw new NotFoundException('Invalid Company ID');
//       }
//     }

//     //Buscar empleado
//     let employee: Employee | null = null;
//     if (createUserDto.employee_id) {
//       employee = await this.employeesRepository.findOne({
//         where: { id: createUserDto.employee_id }
//       });

//       if (!employee) {
//         throw new NotFoundException('Invalid Employee ID');
//       }
//     }
//     //Creacion y carga de user en DB
//     const newUser = new User();
//     newUser.role = rol;
//     newUser.email = createUserDto.email;

//     if (company) {
//       newUser.company = company;
//     }
//     if (employee) {
//       newUser.employee = employee;
//     }
//     newUser.first_name = createUserDto.first_name;
//     newUser.last_name = createUserDto.last_name;
//     newUser.profile_image_url = createUserDto.profile_image_url;
//     newUser.created_at = new Date();
//     newUser.updated_at = new Date();

//     await this.userRepository.save(newUser);

//     return 'User add sucssesfully';
//   }

//   async findAll(): Promise<User[]> {
//     return this.userRepository.find();
//   }

//   async findOne(id: string): Promise<User> {
//     const user = await this.userRepository.findOne({
//       where: { id },
//       relations: ['role', 'company', 'employee']
//     });

//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }

//     return user as User;
//   }

//   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
//     await this.userRepository.update(id, updateUserDto);
//     return this.findOne(id);
//   }

//   async remove(id: string): Promise<void> {
//     await this.userRepository.softDelete(id);
//   }
// }
 
//refact multi-tenant
import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Company } from 'src/empresa/entities/empresa.entity';
import { Employee } from 'src/empleado/entities/empleado.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async create(createUserDto: CreateUserDto, authUser: User): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });
    if (userFound) throw new ConflictException('Email already exists.');

    // Buscar rol
    const rol = await this.rolesRepository.findOne({
      where: { id: createUserDto.role_id }
    });
    if (!rol) throw new NotFoundException('Invalid Role ID');

    // La empresa se toma del usuario autenticado (multi-tenant)
    const company = authUser.company;
    if (!company)
      throw new InternalServerErrorException('User has no associated company');

    // (Opcional) Buscar empleado si se requiere
    let employee: Employee | null = null;
    if (createUserDto.employee_id) {
      employee = await this.employeesRepository.findOne({
        where: { id: createUserDto.employee_id, company: { id: company.id } }, // 👈 evita cross-tenant
      });
      if (!employee) throw new NotFoundException('Invalid Employee ID');
    }

    const newUser = this.userRepository.create({
      email: createUserDto.email,
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      profile_image_url: createUserDto.profile_image_url,
      role: rol,
      company: company,
       employee: employee ?? undefined
      // created_at: new Date(),
      // updated_at: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  async findAll(authUser: User): Promise<User[]> {
    return this.userRepository.find({
      where: { company: { id: authUser.company.id } },
      relations: ['role', 'company', 'employee'],
    });
  }

  async findOne(id: string, authUser: User): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, company: { id: authUser.company.id } },
      relations: ['role', 'company', 'employee'],
    });

    if (!user)
      throw new NotFoundException('User not found or not in your company');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, authUser: User): Promise<User> {
    const user = await this.findOne(id, authUser);
    Object.assign(user, updateUserDto);
    user.updated_at = new Date();
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: string, authUser: User): Promise<void> {
    const user = await this.findOne(id, authUser);
    await this.userRepository.softDelete(user.id);
  }
}
