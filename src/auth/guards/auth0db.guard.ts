import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { requiresAuth } from 'express-openid-connect';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class Auth0DbGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    // ✅ Verificamos si hay sesión sin redirección
    if (!req.oidc?.isAuthenticated()) {
      throw new UnauthorizedException('Not authenticated');
    }

    const auth0User = req.oidc?.user;
    if (!auth0User) {
      throw new UnauthorizedException('No user data from Auth0');
    }

    // 2. Validar en DB
    const dbUser = await this.usersRepository.findOne({
      where: { email: auth0User.email }
    });
    if (!dbUser) {
      throw new ForbiddenException('User not registered in the database');
    }

    return true; //pasa Auth0 + DB
  }
}
