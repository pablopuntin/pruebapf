import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SameSiteNoneMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 1. Captura el método res.cookie
    const setHeader = res.setHeader.bind(res);

    // 2. Sobrescribe la función setHeader para modificar el encabezado Set-Cookie
    res.setHeader = (key: string, value: any) => {
      if (key === 'Set-Cookie') {
        let cookies = Array.isArray(value) ? value : [value];

        // 3. Itera sobre las cookies y modifica la que coincida
        cookies = cookies.map((cookie) => {
          // Si la cookie es la que está causando problemas Y no tiene ya SameSite=None
          if (
            cookie.includes('auth_verification') &&
            !cookie.includes('SameSite=None')
          ) {
            // Reemplaza "SameSite=Lax" por "SameSite=None" y añade "Secure"
            // (Asumiendo que la librería ya puso Secure, sino hay que añadirlo)
            return cookie.replace('SameSite=Lax', 'SameSite=None; Secure');
          }
          return cookie;
        });

        return setHeader(key, cookies);
      }
      // Para cualquier otro encabezado, usa el método original
      return setHeader(key, value);
    };

    next();
  }
}
