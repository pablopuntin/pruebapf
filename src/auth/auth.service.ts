import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Company } from 'src/empresa/entities/empresa.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { verifyAuth0Token } from './util/ath0-verify';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Company)
    private readonly companiesRepo: Repository<Company>,
    @InjectRepository(Rol)
    private readonly rolesRepo: Repository<Rol>,
    private readonly jwtService: JwtService,
  ) {}

  // Valida el token de Auth0 y genera un JWT interno
  async exchangeAuth0Token(idToken: string): Promise<string> {
    // 1️⃣ Validar token contra Auth0
    const auth0User = await verifyAuth0Token(idToken).catch(() => {
      throw new UnauthorizedException('Invalid Auth0 token');
    });

    if (!auth0User?.email) {
      throw new UnauthorizedException('Auth0 user missing email');
    }

    // 2️⃣ Buscar usuario local por email
    let user = await this.usersRepo.findOne({
      where: { email: auth0User.email },
      relations: ['company', 'role'],
    });

    // 3️⃣ Si no existe, crearlo con rol por defecto
    if (!user) {
      const defaultRole = await this.rolesRepo.findOne({
        where: { name: 'USER' },
      });

      if (!defaultRole) {
        throw new UnauthorizedException(
          'Default role "USER" not found. Please seed roles in DB.',
        );
      }

      user = this.usersRepo.create({
        email: auth0User.email,
        first_name: auth0User.name || 'Auth0 User',
        role: defaultRole, // ✅ TypeScript seguro
        company: null,
      });

      await this.usersRepo.save(user);
    }

    const company = user.company || null;
    const roleName = user.role?.name || 'USER';

    // 4️⃣ Generar JWT local
    const payload = {
      sub: user.id,
      email: user.email,
      companyId: company?.id || null,
      roles: [roleName],
    };

    // 🔹 Expiración explícita de 15 minutos
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }
}
