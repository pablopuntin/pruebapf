import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  MaxLength
} from 'class-validator';

export class ContactFormDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del contacto'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombreCompleto: string;

  @ApiProperty({
    example: 'juan.perez@empresa.com',
    description: 'Correo electrónico del contacto'
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  correoElectronico: string;

  @ApiProperty({
    example: '+54 11 1234-5678',
    description: 'Número de teléfono del contacto',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({
    example: 'Tech Solutions S.A.',
    description: 'Nombre de la empresa del contacto',
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  empresa?: string;

  @ApiProperty({
    example: 'Consulta sobre planes de suscripción',
    description: 'Asunto del mensaje'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  asunto: string;

  @ApiProperty({
    example: 'Hola, me interesa conocer más sobre sus planes de suscripción para empresas...',
    description: 'Mensaje detallado del contacto'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  mensaje: string;
}

