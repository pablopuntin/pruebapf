import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-empresa.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  // Si querés agregar propiedades adicionales opcionales, podés usar ApiPropertyOptional
  @ApiPropertyOptional({ description: 'Indica si la empresa está activa' })
  isActive?: boolean;
}
