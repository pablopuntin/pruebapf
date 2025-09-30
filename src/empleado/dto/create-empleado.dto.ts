import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDateString,
  IsNumber
} from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty({ example: 'uuid-usuario', description: 'ID del usuario asociado' })
  @IsUUID()
  @IsNotEmpty()
  usuario_id: string;

  @ApiProperty({ example: 'uuid-empresa', description: 'ID de la empresa' })
  @IsUUID()
  @IsNotEmpty()
  empresa_id: string;

  @ApiProperty({ example: 'uuid-categoria', description: 'ID de la categoría interna' })
  @IsUUID()
  @IsNotEmpty()
  categoria_id: string;

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

  @ApiProperty({ example: '20-12345678-9', description: 'CUIL único del empleado' })
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
  domicilio_laboral?: string;

  @ApiProperty({ example: '1995-05-12', description: 'Fecha de cumpleaños', required: false })
  @IsOptional()
  @IsDateString()
  cumpleaños?: Date;

  @ApiProperty({ example: '1995-05-12', description: 'Fecha de nacimiento', required: false })
  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: Date;

  @ApiProperty({ example: 'https://cdn.com/empleado.png', required: false })
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiProperty({ example: 75000.50, description: 'Sueldo del empleado', required: false })
  @IsOptional()
  @IsNumber()
  sueldo?: number;
}
