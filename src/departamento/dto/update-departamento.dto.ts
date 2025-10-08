import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, Matches } from 'class-validator';

export class UpdateDepartamentoDto {
  @ApiPropertyOptional({
    example: 'Recursos Humanos Actualizado',
    description: 'Nombre del departamento (opcional)',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El nombre debe contener solo letras y espacios'
  })
  nombre?: string;

  @ApiPropertyOptional({
    example:
      'Departamento actualizado encargado de gestionar el personal de la empresa',
    description: 'Descripción del departamento (opcional)',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;
}
