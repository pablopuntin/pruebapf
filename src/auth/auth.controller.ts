import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCompanyDto } from 'src/empresa/dto/create-empresa.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Recibe el id_token de Auth0, lo valida y devuelve un JWT propio
  // @Post('exchange')
  // async exchangeToken(@Body('id_token') idToken: string) {
  //   if (!idToken) throw new UnauthorizedException('Missing Auth0 token');

  //   const jwt = await this.authService.exchangeAuth0Token(idToken);
  //   return { access_token: jwt };
  // }
@Post('registroInicial')
async registroInicial(@Body() dto: {
  email: string;
  first_name: string;
  empresa: CreateCompanyDto;
}) {
  return this.authService.registerInitialUser(dto);
}

}
