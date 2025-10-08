import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, Matches } from 'class-validator';

export class UpdateRolDto {
  @ApiPropertyOptional({
    example: 'HR_MANAGER_UPDATED',
    description: 'Nombre del rol (opcional)',
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Matches(/^[A-Z_]+$/, {
    message: 'El nombre del rol debe contener solo mayúsculas y guiones bajos'
  })
  name?: string;

  @ApiPropertyOptional({
    example:
      'Gerente de Recursos Humanos actualizado con acceso completo al módulo de empleados',
    description: 'Descripción detallada del rol (opcional)',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
