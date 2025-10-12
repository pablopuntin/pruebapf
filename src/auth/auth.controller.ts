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
import { ClerkAuthGuard } from './guards/clerk.guard';
import type { AuthRequest } from 'src/interfaces/authrequest.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ClerkAuthGuard)
  @Get('auth/me')
  async getAuthUser(@Req() req: AuthRequest) {
    const { clerkId } = req.user;
    return this.authService.getAuthUser(clerkId);
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
