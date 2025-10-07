import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, Matches } from 'class-validator';

export class CreateRolDto {
  @ApiProperty({
    example: 'HR_MANAGER',
    description: 'Nombre del rol (ej: SUPER_ADMIN, COMPANY_OWNER, HR_MANAGER)',
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[A-Z_]+$/, {
    message: 'El nombre del rol debe contener solo mayúsculas y guiones bajos'
  })
  name: string;

  @ApiProperty({
    example:
      'Gerente de Recursos Humanos con acceso completo al módulo de empleados',
    description: 'Descripción detallada del rol',
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;
}
