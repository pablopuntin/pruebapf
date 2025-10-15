import { Request } from 'express';
import { AuthenticatedUser } from './authenticated-user.interface';

export interface AuthRequest extends Request {
  user: AuthenticatedUser; // Nota: 'user' NO es opcional aquí.
}
