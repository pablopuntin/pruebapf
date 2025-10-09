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
<<<<<<< Updated upstream
import { Auth0DbGuard } from './guards/auth0db.guard';
=======
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody
} from '@nestjs/swagger';
>>>>>>> Stashed changes

@ApiTags('Autenticación')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login manual → redirige a Auth0
  @Get('/login')
  @ApiOperation({ summary: 'Iniciar sesión con Auth0' })
  @ApiResponse({
    status: 302,
    description: 'Redirección a Auth0 para autenticación'
  })
  login(@Req() req: Request, @Res() res: Response) {
    res.oidc.login({
      returnTo:
        'https://front-git-main-hr-systems-projects.vercel.app/dashboard'
    });
  }

  // Callback → Auth0 ya emitió la cookie, redirige al frontend
  @Get('/callback')
<<<<<<< Updated upstream
  callback(@Req() req: Request, @Res() res: Response) {
=======
  @ApiOperation({ summary: 'Callback de Auth0 después de autenticación' })
  @ApiResponse({
    status: 302,
    description: 'Redirección al dashboard con token de aplicación'
  })
  @ApiResponse({
    status: 302,
    description: 'Redirección a página principal si no hay usuario'
  })
  async callback(@Req() req: Request, @Res() res: Response) {
>>>>>>> Stashed changes
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
  @ApiOperation({ summary: 'Cerrar sesión con Auth0' })
  @ApiResponse({
    status: 302,
    description: 'Redirección a Auth0 para cerrar sesión'
  })
  logout(@Req() req: Request, @Res() res: Response) {
    res.oidc.logout({
      returnTo: 'https://front-git-main-hr-systems-projects.vercel.app'
    });
  }

  @UseGuards(Auth0DbGuard)
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
  @ApiOperation({ summary: 'Registro de nueva empresa y usuario' })
  @ApiBody({ type: CreateRegisterDto })
  @ApiResponse({
    status: 201,
    description: 'Empresa y usuario creados exitosamente',
    type: CreateRegisterDto
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Email o empresa ya existe' })
  async create(@Body() newRegister: CreateRegisterDto) {
    return this.authService.create(newRegister);
  }
}
