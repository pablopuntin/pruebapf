import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/create-register.dto';

@Controller('onboarding')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() newRegister: CreateRegisterDto) {
    return this.authService.create(newRegister);
  }
}
