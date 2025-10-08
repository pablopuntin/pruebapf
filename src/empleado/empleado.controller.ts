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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';
import { EmpleadoService } from './empleado.service';
import { CreateEmployeeDto } from './dto/create-empleado.dto';
import { UpdateEmployeeDto } from './dto/update-empleado.dto';
import { SearchEmpleadoDto } from './dto/search-empleado.dto';

@ApiTags('Empleado')
@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nuevo empleado',
    description:
      'Registra un nuevo empleado en el sistema. La empresa se obtiene automáticamente del usuario autenticado.'
  })
  @ApiBody({
    type: CreateEmployeeDto,
    description: 'Datos del empleado a crear'
  })
  @ApiResponse({
    status: 201,
    description: 'Empleado creado exitosamente'
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos'
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autenticado'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor'
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() req: any) {
    const user = req.user; // viene del JWT
    return this.empleadoService.create(createEmployeeDto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los empleados',
    description:
      'Retorna una lista de todos los empleados registrados en el sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de empleados obtenida exitosamente'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor'
  })
  findAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener empleado por ID',
    description: 'Retorna la información completa de un empleado específico'
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del empleado',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @ApiResponse({
    status: 200,
    description: 'Empleado encontrado exitosamente'
  })
  @ApiResponse({
    status: 404,
    description: 'Empleado no encontrado'
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido'
  })
  findOne(@Param('id') id: string) {
    return this.empleadoService.findOne(id);
  }

  @Post('search')
  @ApiOperation({
    summary: 'Buscar empleados',
    description:
      'Busca empleados según criterios específicos (nombre, apellido, email, etc.)'
  })
  @ApiBody({
    type: SearchEmpleadoDto,
    description: 'Criterios de búsqueda'
  })
  @ApiResponse({
    status: 200,
    description: 'Búsqueda realizada exitosamente'
  })
  @ApiResponse({
    status: 400,
    description: 'Criterios de búsqueda inválidos'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor'
  })
  search(@Body() searchDto: SearchEmpleadoDto) {
    return this.empleadoService.search(searchDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar empleado',
    description:
      'Actualiza la información de un empleado existente. Solo se actualizan los campos enviados.'
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del empleado a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @ApiBody({
    type: UpdateEmployeeDto,
    description: 'Campos del empleado a actualizar (todos opcionales)'
  })
  @ApiResponse({
    status: 200,
    description: 'Empleado actualizado exitosamente'
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos'
  })
  @ApiResponse({
    status: 404,
    description: 'Empleado no encontrado'
  })
  @ApiResponse({
    status: 409,
    description: 'El DNI o CUIL ya está registrado por otro empleado'
  })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.empleadoService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar empleado',
    description: 'Elimina un empleado del sistema (soft delete)'
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del empleado a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @ApiResponse({
    status: 200,
    description: 'Empleado eliminado exitosamente'
  })
  @ApiResponse({
    status: 404,
    description: 'Empleado no encontrado'
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido'
  })
  remove(@Param('id') id: string) {
    return this.empleadoService.remove(id);
  }
}
