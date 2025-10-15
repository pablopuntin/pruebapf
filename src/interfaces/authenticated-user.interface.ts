export interface AuthenticatedUser {
  clerkId: string;
  id: string;
  email: string;
  name: string;
  rol: string;
  companyId: string;
  roles: string[];
}
