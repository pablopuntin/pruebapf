import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmployeeDto } from './dto/create-empleado.dto';
import { UpdateEmployeeDto } from './dto/update-empleado.dto';
import { SearchEmpleadoDto } from './dto/search-empleado.dto';

@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  // @Post()
  // create(@Body() createEmployeeDto: CreateEmployeeDto) {
  //   return this.empleadoService.create(createEmployeeDto);
  // }

  //toma user.company de la request
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() req: any) {
  const user = req.user; // viene del JWT
  return this.empleadoService.create(createEmployeeDto, user);
  }

  @Get()
  findAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadoService.findOne(id);
  }

  @Post('search')
  search(@Body() searchDto: SearchEmpleadoDto) {
  return this.empleadoService.search(searchDto);
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
