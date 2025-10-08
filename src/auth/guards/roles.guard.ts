import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { Role } from 'src/rol/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Obtener la request
    const request = context.switchToHttp().getRequest();

    //Accediendo a la metadada por medio de Reflector, a los valores de parametro de @Roles
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    //Obteniedo la propiedad user de la request {roles: ["admin/user"]}
    const user = request.user;
    if (!user || !user.roles) return false;

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
