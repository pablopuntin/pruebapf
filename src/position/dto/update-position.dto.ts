import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, Matches } from 'class-validator';

export class UpdatePositionDto {
  @ApiPropertyOptional({
    example: 'Gerente Actualizado',
    description: 'Nombre del puesto/cargo (opcional)',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El nombre debe contener solo letras y espacios'
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'Gerente actualizado a cargo de la empresa',
    description: 'Descripción detallada del puesto (opcional)',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
