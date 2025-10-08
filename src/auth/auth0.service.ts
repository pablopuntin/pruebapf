import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  AUTH0_CLIENTID,
  AUTH0_CLIENTSECRET,
  AUTH0_DOMAIN
} from 'src/config/auth0.envs';

@Injectable()
export class Auth0Service {
  constructor(private readonly http: HttpService) {}

  private domain = AUTH0_DOMAIN;
  private clientId = AUTH0_CLIENTID;
  private clientSecret = AUTH0_CLIENTSECRET;

  // 🔑 1. Obtener un token de Management API
  async getManagementToken(): Promise<string> {
    const response = await firstValueFrom(
      this.http.post(`https://${this.domain}/oauth/token`, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: `https://${this.domain}/api/v2/`,
        grant_type: 'client_credentials'
      })
    );

    return response.data.access_token;
  }

  // 👤 2. Crear usuario en Auth0
  async createUser(email: string, password: string, name?: string) {
    const token = await this.getManagementToken();

    const response = await firstValueFrom(
      this.http.post(
        `https://${this.domain}/api/v2/users`,
        {
          email,
          password,
          connection: 'Username-Password-Authentication',
          name
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
    );

    return response.data;
  }
}
