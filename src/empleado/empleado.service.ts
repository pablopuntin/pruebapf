import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-empleado.dto';
import { UpdateEmployeeDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadoService {
  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new empleado';
  }

  findAll() {
    return `This action returns all empleado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empleado`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} empleado`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleado`;
  }
}
