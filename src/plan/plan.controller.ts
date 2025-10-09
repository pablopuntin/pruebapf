import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';

@ApiTags('Planes')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo plan' })
  @ApiBody({ type: CreatePlanDto })
  @ApiResponse({
    status: 201,
    description: 'Plan creado exitosamente',
    type: CreatePlanDto
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los planes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de planes obtenida exitosamente',
    type: [CreatePlanDto]
  })
  findAll() {
    return this.planService.findAll();
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Ejecutar seeder de planes' })
  @ApiResponse({
    status: 200,
    description: 'Seeder ejecutado exitosamente'
  })
  seeder() {
    return this.planService.seeder();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un plan por ID' })
  @ApiParam({ name: 'id', description: 'ID del plan', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Plan encontrado exitosamente',
    type: CreatePlanDto
  })
  @ApiResponse({ status: 404, description: 'Plan no encontrado' })
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un plan' })
  @ApiParam({ name: 'id', description: 'ID del plan', type: 'string' })
  @ApiBody({ type: UpdatePlanDto })
  @ApiResponse({
    status: 200,
    description: 'Plan actualizado exitosamente',
    type: CreatePlanDto
  })
  @ApiResponse({ status: 404, description: 'Plan no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(id, updatePlanDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un plan' })
  @ApiParam({ name: 'id', description: 'ID del plan', type: 'string' })
  @ApiResponse({ status: 200, description: 'Plan eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Plan no encontrado' })
  remove(@Param('id') id: string) {
    return this.planService.remove(id);
  }
}
