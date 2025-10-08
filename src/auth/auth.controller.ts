import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import type { Request, Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login manual → redirige a Auth0
  @Get('/login')
  login(@Req() req: Request, @Res() res: Response) {
    res.oidc.login({
      returnTo: '/callback'
    });
  }

  // Callback → Auth0 ya emitió la cookie, redirige al frontend
  @Get('/callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    try {
      // Esto procesa la respuesta de Auth0, intercambia el código,
      // establece la sesión/cookie y POPULA req.oidc.user.
      await res.oidc.callback();
      // Nota: Si necesitas opciones como 'redirectUri', puedes pasarlas:
      // await res.oidc.callback({ redirectUri: 'https://back-8cv1.onrender.com/callback' });
    } catch (error) {
      console.error('Error durante el callback de Auth0:', error);
      return res.redirect(
        'https://front-git-main-hr-systems-projects.vercel.app/?error=auth_failed'
      );
    }

    const user = req.oidc?.user;

    if (!user) {
      return res.redirect(
        'https://front-git-main-hr-systems-projects.vercel.app'
      );
    }

    const appToken = await this.authService.generateAppToken(user);

    console.log('Redirecting to frontend with token:', appToken);

    // redirigimos al frontend
    return res.redirect(
      `https://front-git-main-hr-systems-projects.vercel.app/dashboard?token=${appToken}`
    );
  }

  // logout manual → elimina cookie + cierra sesión en Auth0 + redirige al frontend
  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.oidc.logout({
      returnTo: 'https://front-git-main-hr-systems-projects.vercel.app'
    });
  }

  @Post('onboarding')
  async create(@Body() newRegister: CreateRegisterDto) {
    return this.authService.create(newRegister);
  }
}
