import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { clerkClient } from '@clerk/express';

@Injectable()
export class ClerkService {
  async createUser(email: string, password: string, name?: string) {
    try {
      const user = await clerkClient.users.createUser({
        emailAddress: [email],
        password: password,
        firstName: name
      });
      return user;
    } catch (error) {
      console.error('Error al crear usuario en Clerk:', error);

      throw new InternalServerErrorException(
        'Fallo en el registro de autenticación en Clerk.'
      );
    }
  }
}
