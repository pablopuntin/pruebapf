import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-empresa.dto';
import { UpdateCompanyDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new empresa';
  }

  findAll() {
    return `This action returns all empresa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }
}
