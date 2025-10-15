import { ApiPropertyOptional } from '@nestjs/swagger';
import { 
  IsString, 
  IsOptional, 
  IsEmail, 
  IsUUID, 
  MaxLength, 
  MinLength,
  IsUrl
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del rol del usuario (opcional)',
    format: 'uuid'
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  role_id?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del empleado asociado (opcional)',
    format: 'uuid'
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  employee_id?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID de la empresa asociada (opcional)',
    format: 'uuid'
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  company_id?: string;

  @ApiPropertyOptional({
    example: 'usuario.actualizado@empresa.com',
    description: 'Correo electrónico del usuario (opcional)',
    format: 'email'
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({
    example: 'NuevaContrasena123!',
    description: 'Contraseña del usuario (opcional, mínimo 8 caracteres)',
    minLength: 8,
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password?: string;

  @ApiPropertyOptional({
    example: 'Juan Carlos',
    description: 'Nombre del usuario (opcional)',
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  first_name?: string;

  @ApiPropertyOptional({
    example: 'Pérez García',
    description: 'Apellido del usuario (opcional)',
    maxLength: 50
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  last_name?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.com/new-profile.jpg',
    description: 'URL de la imagen de perfil (opcional)',
    format: 'url'
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(255)
  profile_image_url?: string;
}
