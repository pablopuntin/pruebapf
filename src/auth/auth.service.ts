import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { Auth0Service } from './auth0.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRegisterDto } from './dto/create-register.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Company } from 'src/empresa/entities/empresa.entity';
import { User } from 'src/user/entities/user.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Suscripcion } from 'src/suscripcion/entities/suscripcion.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Role } from 'src/rol/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
    @InjectRepository(Plan)
    private readonly plansRepository: Repository<Plan>,
    @InjectRepository(Suscripcion)
    private readonly suscriptionsRepository: Repository<Suscripcion>,
    @InjectRepository(Rol)
    private readonly rolesRepository: Repository<Rol>,
    private readonly jwtService: JwtService,
    private readonly auth0Service: Auth0Service
  ) {}

  //-------------Crear Registro-------------//
  async create(newRegister: CreateRegisterDto) {
    //Validar que no exista la empresa
    const companyFound: Company | null = await this.companiesRepository.findOne(
      {
        where: [
          { email: newRegister.email },
          { legal_name: newRegister.legal_name }
        ]
      }
    );

    if (companyFound) {
      if (companyFound.email === newRegister.email) {
        throw new ConflictException('Email already exist.');
      } else if (companyFound.legal_name === newRegister.legal_name) {
        throw new ConflictException('Legal name already exist.');
      }
    }

    //Registar en la DB la nueva empresa
    const company = new Company();
    company.trade_name = newRegister.trade_name;
    company.legal_name = newRegister.legal_name;
    company.email = newRegister.email;
    company.logo = newRegister.logo_url;
    company.phone_number = newRegister.phone_number;
    company.address = newRegister.address;

    await this.companiesRepository.save(company);

    const companySaved = await this.companiesRepository.findOne({
      where: { id: company.id }
    });

    if (!companySaved) {
      throw new NotFoundException('Error, Company not found after register.');
    }

    //Encontrar el Plan en la DB
    const plan = await this.plansRepository.findOne({
      where: { id: newRegister.plan_id }
    });

    if (!plan) {
      throw new NotFoundException('Error, Plan id not found.');
    }

    //Fechas
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + plan.duration_days);

    //Registar en la DB una nueva Suscripcion
    const newSuscripcion = new Suscripcion();
    newSuscripcion.company = companySaved;
    newSuscripcion.plan = plan;
    newSuscripcion.start_date = currentDate;
    newSuscripcion.end_date = futureDate;

    await this.suscriptionsRepository.save(newSuscripcion);

    //Encontral el Rol en la DB
    const rol = await this.rolesRepository.findOne({
      where: { name: Role.COMPANY_OWNER }
    });

    if (!rol) {
      throw new NotFoundException('Error, rol is not valid.');
    }

    //Registar al usuario en la DB
    const userFound = await this.usersRepository.findOne({
      where: { email: newRegister.email }
    });

    if (userFound) {
      throw new ConflictException('Email already exist.');
    }

    const newUser = new User();
    newUser.email = newRegister.email;
    newUser.first_name = newRegister.name;
    newUser.role = rol;
    newUser.company = companySaved;
    newUser.created_at = currentDate;
    newUser.updated_at = currentDate;

    await this.usersRepository.save(newUser);

    // Registro en Auth0
    await this.auth0Service.createUser(
      newRegister.email,
      newRegister.password,
      newRegister.name
    );

    return {
      message: 'Register successfully.'
    };
  }

  //-------------Generar Token para cookie-------------//

  async generateAppToken(user: any, res: Response) {
    const userLogin = await this.usersRepository.findOne({
      where: { email: user.email },
      relations: { company: true, role: true }
    });

    if (!userLogin) {
      throw new NotFoundException('User not found in DB.');
    }

    const { id, email, first_name, role, company, ...props } = userLogin;

    // Token JWT
    const appToken = this.jwtService.sign({
      sub: user.sub,
      id: id,
      email: email,
      name: first_name,
      rol: role.name,
      companyId: company.id
    });

    // Setear cookie
    res.cookie('app_token', appToken, {
      httpOnly: false, // ⚠️ accesible desde el frontend
      secure: true,
      sameSite: 'none',
      domain: 'front-git-main-hr-systems-projects.vercel.app'
    });

    return appToken; // opcional si lo quieres usar
  }
}
