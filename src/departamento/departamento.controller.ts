import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@ApiTags('Departamento')
@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nuevo departamento',
    description: 'Registra un nuevo departamento en el sistema'
  })
  @ApiBody({
    type: CreateDepartamentoDto,
    description: 'Datos del departamento a crear'
  })
  @ApiResponse({
    status: 201,
    description: 'Departamento creado exitosamente'
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor'
  })
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentoService.create(createDepartamentoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los departamentos',
    description: 'Retorna una lista de todos los departamentos registrados'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de departamentos obtenida exitosamente'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor'
  })
  findAll() {
    return this.departamentoService.findAll();
  }

  @Get('seeder')
  @ApiOperation({
    summary: 'Ejecutar seeder de departamentos/categorías',
    description: 'Carga departamentos predefinidos en el sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Seeder ejecutado exitosamente'
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor'
  })
  seeder() {
    return this.departamentoService.seeder();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener departamento por ID',
    description: 'Retorna la información completa de un departamento específico'
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del departamento',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @ApiResponse({
    status: 200,
    description: 'Departamento encontrado exitosamente'
  })
  @ApiResponse({
    status: 404,
    description: 'Departamento no encontrado'
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido'
  })
  findOne(@Param('id') id: string) {
    return this.departamentoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar departamento',
    description: 'Actualiza la información de un departamento existente'
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del departamento a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @ApiBody({
    type: UpdateDepartamentoDto,
    description: 'Campos del departamento a actualizar (todos opcionales)'
  })
  @ApiResponse({
    status: 200,
    description: 'Departamento actualizado exitosamente'
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos'
  })
  @ApiResponse({
    status: 404,
    description: 'Departamento no encontrado'
  })
  update(
    @Param('id') id: string,
    @Body() updateDepartamentoDto: UpdateDepartamentoDto
  ) {
    return this.departamentoService.update(id, updateDepartamentoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar departamento',
    description: 'Elimina un departamento del sistema'
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del departamento a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @ApiResponse({
    status: 200,
    description: 'Departamento eliminado exitosamente'
  })
  @ApiResponse({
    status: 404,
    description: 'Departamento no encontrado'
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido'
  })
  remove(@Param('id') id: string) {
    return this.departamentoService.remove(id);
  }
}
