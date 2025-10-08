import { ConfigParams } from 'express-openid-connect';
import {
  AUTH0_BASEURL,
  AUTH0_CLIENTID,
  AUTH0_SECRET,
  AUTH0_CLIENTSECRET
} from './auth0.envs';

const isProduction = process.env.NODE_ENV === 'production' || !!AUTH0_BASEURL;

console.log(AUTH0_BASEURL);

export const config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_BASEURL,
  clientID: AUTH0_CLIENTID,
  clientSecret: AUTH0_CLIENTSECRET,
  issuerBaseURL: 'https://dev-hrsystem.us.auth0.com',
  routes: {
    login: false, // ❌ desactivamos login automático
    logout: false, // ❌ desactivamos logout automático
    callback: false // ruta a la que Auth0 redirige después de login
  },
  idpLogout: true, // al hacer logout también se borra la sesión en Auth0
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email'
  },
  session: {
    // Si estamos en producción, necesitamos configurar las cookies correctamente
    cookie: {
      // Necesario para entornos de producción (HTTPS)
      secure: isProduction,

      // 'none' es esencial para que la cookie se envíe de vuelta a tu backend
      // después de la redirección de Auth0.
      sameSite: isProduction ? 'none' : 'lax'
    }
  }
  /*
  //Después de login, redirigir al frontend
  afterCallback: async (req, res, session) => {
    res.redirect(
      'https://front-git-main-hr-systems-projects.vercel.app/dashboard'
    );
    return session;
  }
  */
};
