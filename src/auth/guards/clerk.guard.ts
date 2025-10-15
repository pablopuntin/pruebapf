import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verifyToken } from '@clerk/backend';
import { Request } from 'express';
import { CLERK_SECRET_KEY } from 'src/config/envs';
import { UserService } from 'src/user/user.service';

//-------------------------------------------------//
//-------------------------------------------------//
//-------------------------------------------------//
@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization; //"Bearer token"

    //Validaciones
    if (!authHeader) return false;

    const bearer: string = authHeader.split(' ')[0]; // "token"
    if (!bearer) return false;
    if (bearer !== 'Bearer') return false;

    const token: string = authHeader.split(' ')[1]; // "token"
    if (!token) return false;

    try {
      //Verificar token de Clerk
      const payload = await verifyToken(token, { secretKey: CLERK_SECRET_KEY });

      //Extraer el Id de Clerk
      const clerkUserId = payload.sub;

      if (!clerkUserId) return false;

      //User DB
      const userDB = await this.userService.findByClerkId(clerkUserId);

      if (!userDB) return false;

      //Info del token más DB
      request.user = {
        clerkId: clerkUserId,
        id: userDB.id,
        email: userDB.email,
        name: userDB.first_name,
        rol: userDB.role.name,
        companyId: userDB.company.id,
        roles: [userDB.role.name]
      };

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
