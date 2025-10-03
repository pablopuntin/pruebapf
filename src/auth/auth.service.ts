import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';

@Injectable()
export class AuthService {
  create(newRegister: CreateRegisterDto) {
    return 'This action adds a new register';
  }
}
