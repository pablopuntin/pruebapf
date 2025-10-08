import { ConfigParams } from 'express-openid-connect';
import {
  AUTH0_BASEURL,
  AUTH0_CLIENTID,
  AUTH0_SECRET,
  AUTH0_CLIENTSECRET
} from './auth0.envs';

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
    response_type: 'code id_token',
    scope: 'openid profile email'
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
