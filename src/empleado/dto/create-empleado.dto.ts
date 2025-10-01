import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDateString,
  IsNumber,
  Matches
} from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del empleado' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del empleado' })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({ example: 30, description: 'Edad del empleado' })
  @IsInt()
  edad: number;

  @ApiProperty({ example: 12345678, description: 'DNI único del empleado' })
  @IsInt()
  dni: number;

  @ApiProperty({
    example: '20-12345678-9',
    description: 'CUIL único del empleado'
  })
  @IsString()
  @IsNotEmpty()
  cuil: string;

  @ApiProperty({ example: '+54 9 11 1234-5678', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ example: 'Av. Siempre Viva 123', required: false })
  @IsOptional()
  @IsString()
  domicilio?: string;

  @ApiProperty({
    example: '1995-05-12',
    description: 'Fecha de nacimiento',
    required: true
  })
  @IsOptional()
  @IsDateString()
  fecha_nacimiento: Date;

  @ApiProperty({ example: 'https://cdn.com/empleado.png', required: false })
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiProperty({
    example: 75000.5,
    description: 'Sueldo del empleado',
    required: false,
    type: 'number',
    format: 'float'
  })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'El sueldo debe tener como máximo dos decimales'
  })
  @IsOptional()
  @IsNumber()
  sueldo?: number;
}
