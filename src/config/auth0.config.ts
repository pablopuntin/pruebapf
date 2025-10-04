import { ConfigParams } from 'express-openid-connect';
import { AUTH0_BASEURL, AUTH0_CLIENTID, AUTH0_SECRET } from './auth0.envs';
export const config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_BASEURL ?? 'http://localhost:3000',
  clientID: AUTH0_CLIENTID,
  issuerBaseURL: 'https://dev-hrsystem.us.auth0.com',
  routes: {
    callback: '/callback'
  },
  afterCallback: async (req, res, session) => {
    res.redirect('https://front-git-main-hr-systems-projects.vercel.app/');
    return session;
  }
};
