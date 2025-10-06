import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import type { Request, Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  login(@Req() req: Request, @Res() res: Response) {
    res.oidc.login({
      returnTo:
        'https://front-git-main-hr-systems-projects.vercel.app/dashboard'
    });
  }

  // logout manual → elimina cookie + cierra sesión en Auth0 + redirige al frontend
  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.oidc.logout({
      returnTo: 'https://front-git-main-hr-systems-projects.vercel.app'
    });
  }

  @Post('onboarding')
  create(@Body() newRegister: CreateRegisterDto) {
    return this.authService.create(newRegister);
  }
}
