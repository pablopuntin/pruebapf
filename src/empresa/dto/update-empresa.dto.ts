import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaDto } from './create-empresa.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) {
  // Si querés agregar propiedades adicionales opcionales, podés usar ApiPropertyOptional
  @ApiPropertyOptional({ description: 'Indica si la empresa está activa' })
  isActive?: boolean;
}
