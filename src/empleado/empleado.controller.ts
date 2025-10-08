import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseGuards
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
import { Request } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthUser } from 'src/decoradores/aut-user.decoratos';

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
  
  // async create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() req: Request) {
  //   const authUser = req.user as User;
  //   return this.empleadoService.create(createEmployeeDto, authUser);
  // }

  //CON DECORADOR
   async create(
    @AuthUser() user: any,
    @Body() dto: CreateEmployeeDto
  ) {
    return this.empleadoService.create(dto, user);
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
  async findAll(@AuthUser() user: any) {
    return this.empleadoService.findAll(user);
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
   async findOne(@Param('id') id: string, @AuthUser() user: any) {
    return this.empleadoService.findOne(id, user);
  }

  @Get('search')
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
    async searchEmpleados(
    @AuthUser() user: any,
    @Query() searchDto: SearchEmpleadoDto
  ) {
    return this.empleadoService.search(user, searchDto);
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
   async update(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
    @AuthUser() user: any
  ) {
    return this.empleadoService.update(id, dto, user);
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
  async remove(@Param('id') id: string, @AuthUser() user: any) {
    return this.empleadoService.remove(id, user);
  }

  //ruta de ausencias del empleado

@Get(':id/ausencias')
async getAusenciasByEmpleado(
  @Param('id') employeeId: string,
  @AuthUser() user: User,
  @Query('month') month?: number,
  @Query('year') year?: number
) {
  return this.empleadoService.getAusenciasByEmpleado(employeeId, user, month, year);
}

 
}
