import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmployeeDto } from './dto/create-empleado.dto';
import { UpdateEmployeeDto } from './dto/update-empleado.dto';
import { Employee } from './entities/empleado.entity';

@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.empleadoService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  indOne(@Param('id') id: string) {
    return this.empleadoService.findOne(id);
  }

  //probando busqueda por id, dni o last_name
  @Get('dni/:dni')
  findByDni(@Param('dni') dni: number): Promise<Employee> {
    return this.empleadoService.findByDni(dni);
  }

  @Get('last-name/:lastName')
  findByLastName(@Param('lastName') lastName: string): Promise<Employee> {
    return this.empleadoService.findByLastName(lastName);
  }


  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.empleadoService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadoService.remove(id);
  }
}
