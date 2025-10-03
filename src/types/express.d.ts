import { OidcRequest } from 'express-openid-connect';
import * as express from 'express';

declare global {
  namespace Express {
    interface Request extends OidcRequest {}
  }
}
