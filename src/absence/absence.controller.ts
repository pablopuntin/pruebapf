import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';

@ApiTags('Absence')
@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar nueva ausencia' })
  @ApiResponse({ status: 201, description: 'Ausencia registrada exitosamente' })
  create(@Body() createAbsenceDto: CreateAbsenceDto) {
    return this.absenceService.create(createAbsenceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ausencias' })
  findAll() {
    return this.absenceService.findAll();
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Obtener ausencias de un empleado específico' })
  findByEmployee(@Param('employeeId') employeeId: string) {
    return this.absenceService.findByEmployee(employeeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ausencia por ID' })
  findOne(@Param('id') id: string) {
    return this.absenceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una ausencia' })
  update(@Param('id') id: string, @Body() updateAbsenceDto: UpdateAbsenceDto) {
    return this.absenceService.update(id, updateAbsenceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ausencia' })
  remove(@Param('id') id: string) {
    return this.absenceService.remove(id);
  }
}
