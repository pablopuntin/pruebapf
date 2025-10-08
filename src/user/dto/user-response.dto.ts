import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID único del usuario',
    format: 'uuid'
  })
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del rol del usuario',
    format: 'uuid'
  })
  role_id: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del empleado asociado',
    format: 'uuid'
  })
  employee_id?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID de la empresa asociada',
    format: 'uuid'
  })
  company_id?: string;

  @ApiProperty({
    example: 'usuario@empresa.com',
    description: 'Correo electrónico del usuario',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario'
  })
  first_name: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del usuario'
  })
  last_name: string;

  @ApiPropertyOptional({
    example: 'https://cdn.com/profile.jpg',
    description: 'URL de la imagen de perfil',
    format: 'url'
  })
  profile_image_url?: string;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Fecha de creación del usuario',
    format: 'date-time'
  })
  created_at: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00.000Z',
    description: 'Fecha de última actualización',
    format: 'date-time'
  })
  updated_at: Date;

  @ApiPropertyOptional({
    example: null,
    description: 'Fecha de eliminación (soft delete)',
    format: 'date-time'
  })
  deletedAt?: Date;
}
