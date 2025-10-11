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

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('auth/me')
  async getProfile(@Req() req: Request) {
    return 'Hola';
  }

  @Post('/prueba/token')
  async getUserWithJwt(@Body() email: string) {
    return this.authService.getUserWithJwt(email);
  }

  @Post('onboarding')
  async create(@Body() newRegister: CreateRegisterDto) {
    return this.authService.create(newRegister);
  }
}
