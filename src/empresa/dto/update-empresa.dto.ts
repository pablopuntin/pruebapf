import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  IsUrl,
  Matches,
  IsBoolean
} from 'class-validator';

export class UpdateCompanyDto {
  @ApiPropertyOptional({
    example: 'Tech Solutions Actualizado',
    description: 'Nombre comercial de la empresa (opcional)',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  trade_name?: string;

  @ApiPropertyOptional({
    example: 'Tech Solutions S.A. Actualizada',
    description: 'Razón social de la empresa (opcional)',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  legal_name?: string;

  @ApiPropertyOptional({
    example: 'Av. Siempre Viva 456, CABA, Argentina',
    description: 'Dirección completa de la empresa (opcional)',
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional({
    example: '+54 11 9876-5432',
    description: 'Número de teléfono de la empresa (opcional)',
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^\+?[\d\s\-\(\)]+$/, {
    message: 'El teléfono debe contener solo números, espacios, guiones y paréntesis'
  })
  phone_number?: string;

  @ApiPropertyOptional({
    example: 'nuevo.contacto@techsolutions.com',
    description: 'Correo electrónico de la empresa (opcional)',
    format: 'email',
    maxLength: 100
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.com/new-logo.png',
    description: 'URL del logo de la empresa (opcional)',
    format: 'url',
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(255)
  logo?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si la empresa está activa (opcional)',
    type: 'boolean'
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
