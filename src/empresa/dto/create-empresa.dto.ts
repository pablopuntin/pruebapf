import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsNumber
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'Tech Solutions',
    description: 'Nombre de la empresa'
  })
  @IsString()
  @IsNotEmpty()
  trade_name: string;

  @ApiProperty({
    example: 'Tech Solutions S.A.',
    description: 'Razón social única de la empresa'
  })
  @IsString()
  @IsNotEmpty()
  legal_name: string;

  @ApiProperty({
    example: 'Av. Siempre Viva 123',
    description: 'Dirección de la empresa',
    required: false
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 555123456,
    description: 'Número de teléfono de la empresa',
    required: false
  })
  @IsOptional()
  @IsNumber()
  phone_number?: number;

  @ApiProperty({
    example: 'contacto@techsolutions.com',
    description: 'Correo electrónico de la empresa',
    required: false
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'https://cdn.com/logo.png',
    description: 'Logo de la empresa (URL)',
    required: false
  })
  @IsOptional()
  @IsString()
  logo_url?: string;
}
