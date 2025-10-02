import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRolDto {
  @ApiProperty({
    example: 'HR_MANAGER',
    description: 'Nombre del rol (ej: SUPER_ADMIN, COMPANY_OWNER, HR_MANAGER)'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example:
      'Gerente de Recursos Humanos con acceso completo al módulo de empleados',
    description: 'Descripción detallada del rol'
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
