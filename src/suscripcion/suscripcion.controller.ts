import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { SuscripcionService } from './suscripcion.service';
import { CreateSuscripcionDto } from './dto/create-suscripcion.dto';
import { UpdateSuscripcionDto } from './dto/update-suscripcion.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';

@ApiTags('Suscripciones')
@Controller('suscripcion')
export class SuscripcionController {
  constructor(private readonly suscripcionService: SuscripcionService) {}

  /*
  @Post()
  @ApiOperation({ summary: 'Crear una nueva suscripción' })
  @ApiBody({ type: CreateSuscripcionDto })
  @ApiResponse({
    status: 201,
    description: 'Suscripción creada exitosamente',
    type: CreateSuscripcionDto
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createSuscripcionDto: CreateSuscripcionDto) {
    return this.suscripcionService.create(createSuscripcionDto);
  }
    */

  @Get()
  @ApiOperation({ summary: 'Obtener todas las suscripciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de suscripciones obtenida exitosamente',
    type: [CreateSuscripcionDto]
  })
  findAll() {
    return this.suscripcionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una suscripción por ID' })
  @ApiParam({ name: 'id', description: 'ID de la suscripción', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Suscripción encontrada exitosamente',
    type: CreateSuscripcionDto
  })
  @ApiResponse({ status: 404, description: 'Suscripción no encontrada' })
  findOne(@Param('id') id: string) {
    return this.suscripcionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una suscripción' })
  @ApiParam({ name: 'id', description: 'ID de la suscripción', type: 'string' })
  @ApiBody({ type: UpdateSuscripcionDto })
  @ApiResponse({
    status: 200,
    description: 'Suscripción actualizada exitosamente',
    type: CreateSuscripcionDto
  })
  @ApiResponse({ status: 404, description: 'Suscripción no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  update(
    @Param('id') id: string,
    @Body() updateSuscripcionDto: UpdateSuscripcionDto
  ) {
    return this.suscripcionService.update(id, updateSuscripcionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una suscripción' })
  @ApiParam({ name: 'id', description: 'ID de la suscripción', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Suscripción eliminada exitosamente'
  })
  @ApiResponse({ status: 404, description: 'Suscripción no encontrada' })
  remove(@Param('id') id: string) {
    return this.suscripcionService.remove(id);
  }
}
