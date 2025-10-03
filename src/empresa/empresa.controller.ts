import { Get, Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateCompanyDto } from './dto/create-empresa.dto';
import { UpdateCompanyDto } from './dto/update-empresa.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(@Body() createEmpresaDto: CreateCompanyDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    // Si id no es UUID válido, Nest lanzará automáticamente un BadRequestException
    return this.empresaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.empresaService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(id);
  }
}
