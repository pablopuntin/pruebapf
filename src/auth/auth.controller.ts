import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import type { Request, Response } from 'express';
import { Auth0DbGuard } from './guards/auth0db.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login manual → redirige a Auth0
  @Get('/login')
  login(@Req() req: Request, @Res() res: Response) {
    res.oidc.login({
      returnTo:
        'https://front-git-main-hr-systems-projects.vercel.app/dashboard'
    });
  }

  // Callback → Auth0 ya emitió la cookie, redirige al frontend
  @Get('/callback')
  callback(@Req() req: Request, @Res() res: Response) {
    const user = req.oidc?.user;

    if (!user) {
      return res.redirect(
        'https://front-git-main-hr-systems-projects.vercel.app'
      );
    }

    this.authService.generateAppToken(user, res);

    // redirigimos al frontend
    return res.redirect(
      'https://front-git-main-hr-systems-projects.vercel.app/dashboard'
    );
  }

  // logout manual → elimina cookie + cierra sesión en Auth0 + redirige al frontend
  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.oidc.logout({
      returnTo: 'https://front-git-main-hr-systems-projects.vercel.app'
    });
  }

  //@UseGuards(Auth0DbGuard)
  @Get('auth/me')
  async getProfile(@Req() req: Request) {
    // El email viene desde Auth0 session cookie
    const email = req.oidc?.user?.email;

    const { user, appToken } = await this.authService.getUserWithJwt(email);

    return {
      user,
      token: appToken // JWT custom
    };
  }

  @Post('onboarding')
  async create(@Body() newRegister: CreateRegisterDto) {
    return this.authService.create(newRegister);
  }
}
