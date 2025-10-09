import { ConfigParams } from 'express-openid-connect';
import {
  AUTH0_BASEURL,
  AUTH0_CLIENTID,
  AUTH0_SECRET,
  AUTH0_CLIENTSECRET
} from './auth0.envs';

export const config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_BASEURL ?? 'http://localhost:3000',
  clientID: AUTH0_CLIENTID,
  clientSecret: AUTH0_CLIENTSECRET,
  issuerBaseURL: 'https://dev-hrsystem.us.auth0.com',
  routes: {
    login: false, // ❌ desactivamos login automático
    logout: false, // ❌ desactivamos logout automático
    callback: '/callback' // ruta a la que Auth0 redirige después de login
  },
  idpLogout: true, // al hacer logout también se borra la sesión en Auth0
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email'
  },
  session: {
    cookie: {
      // 2. OBLIGATORIO: Permite que la cookie se envíe Cross-Origin (Vercel -> Render)
      sameSite: 'None',

      // 3. OBLIGATORIO: Necesario cuando sameSite es 'none', ya que ambos hosts son HTTPS
      secure: true
    }
  }
};
