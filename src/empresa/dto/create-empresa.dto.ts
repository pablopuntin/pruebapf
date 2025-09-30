// import { ApiProperty } from '@nestjs/swagger';

// export class CreateEmpresaDto {
//   @ApiProperty({ description: 'Nombre de la empresa', maxLength: 80 })
//   nombre: string;

//   @ApiProperty({ description: 'Razón social de la empresa', maxLength: 100 })
//   razonSocial: string;

//   @ApiProperty({ description: 'Dirección de la empresa', maxLength: 50 })
//   direccion?: string;

//   @ApiProperty({ description: 'Teléfono de contacto', maxLength: 30 })
//   telefono?: string;

//   @ApiProperty({ description: 'Correo electrónico', maxLength: 50 })
//   email: string;

//   @ApiProperty({ description: 'URL del logo', required: false })
//   logo?: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsNumber
} from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({ example: 'Tech Solutions', description: 'Nombre de la empresa' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    example: 'Tech Solutions S.A.',
    description: 'Razón social única de la empresa'
  })
  @IsString()
  @IsNotEmpty()
  razon_social: string;

  @ApiProperty({
    example: 'Av. Siempre Viva 123',
    description: 'Dirección de la empresa',
    required: false
  })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiProperty({
    example: 555123456,
    description: 'Número de teléfono de la empresa',
    required: false
  })
  @IsOptional()
  @IsNumber()
  telefono?: number;

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
  logo?: string;
}
