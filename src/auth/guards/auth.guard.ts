import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { JWT_SECRET } from 'src/config/auth0.envs';
import { Role } from 'src/rol/enums/role.enum';
//-------------------------------------------------//
//-------------------------------------------------//
//-------------------------------------------------//
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization; //"Bearer token"

    //Validaciones
    if (!authHeader) return false;

    const bearer: string = authHeader.split(' ')[0]; // "token"
    if (!bearer) return false;
    if (bearer !== 'Bearer') return false;

    const token: string = authHeader.split(' ')[1]; // "token"
    if (!token) return false;

    const secret = JWT_SECRET;

    try {
      //{id, email, name, rol, companyId}
      const payload = this.jwtService.verify(token, { secret });

      // Normalizamos roles
      switch (payload.rol) {
        case Role.COMPANY_OWNER:
          payload.roles = [Role.COMPANY_OWNER];
          break;
        case Role.SUPER_ADMIN:
          payload.roles = [Role.SUPER_ADMIN];
          break;
        default:
          payload.roles = [Role.HR_MANAGER];
      }

      //Agregamos una propiedad user a la request
      request.user = payload;

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
