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
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest<Request>();
    const res = httpContext.getResponse<Response>();

    // 1. Validar con Auth0
    await new Promise<void>((resolve, reject) => {
      requiresAuth()(req, res, (err) => {
        if (err)
          reject(new UnauthorizedException('Auth0 Authentication failed'));
        else resolve();
      });
    });

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
