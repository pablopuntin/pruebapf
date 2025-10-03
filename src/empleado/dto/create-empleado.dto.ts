// import { ApiProperty } from '@nestjs/swagger';
// import {
//   IsString,
//   IsNotEmpty,
//   IsInt,
//   IsOptional,
//   IsDateString,
//   IsNumber,
//   Matches,
//   IsEmail
// } from 'class-validator';

// export class CreateEmployeeDto {
//   @ApiProperty({ example: 'Juan', description: 'Nombre del empleado' })
//   @IsString()
//   @IsNotEmpty()
//   first_name: string;

//   @ApiProperty({ example: 'Pérez', description: 'Apellido del empleado' })
//   @IsString()
//   @IsNotEmpty()
//   last_name: string;

//   @ApiProperty({ example: 30, description: 'Edad del empleado' })
//   @IsInt()
//   @IsOptional()
//   age?: number;

//   @ApiProperty({ example: 12345679, description: 'DNI único del empleado' })
//   @IsInt()
//   dni: number;

//   @ApiProperty({ example: '20-12345678-9', description: 'CUIL único del empleado' })
//   @IsString()
//   @IsNotEmpty()
//   cuil: string;

//   @ApiProperty({ example: '+54 9 11 1234-5678', required: false })
//   @IsOptional()
//   @IsString()
//   phone_number?: string;

//   @ApiProperty({ example: 'Av. Siempre Viva 123', required: false })
//   @IsOptional()
//   @IsString()
//   address?: string;

//   @ApiProperty({ example: '1995-05-12', description: 'Fecha de nacimiento', required: false })
//   @IsOptional()
//   @IsDateString()
//   birthdate?: Date;

//   @ApiProperty({ example: 'https://cdn.com/empleado.png', required: false })
//   @IsOptional()
//   @IsString()
//   imgUrl?: string;

//   @ApiProperty({
//     example: 75000.5,
//     description: 'Sueldo del empleado',
//     required: false,
//     type: 'number',
//     format: 'float'
//   })
//   @Matches(/^\d+(\.\d{1,2})?$/, {
//     message: 'El sueldo debe tener como máximo dos decimales'
//   })
//   @IsOptional()
//   @IsNumber()
//   salary?: number;

//   @ApiProperty({ example: 'juan.perez@email.com', description: 'Correo electrónico del empleado' })
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDateString,
  IsNumber,
  IsEmail
} from 'class-validator';
import { MaxTwoDecimals } from 'src/validators/max-two-decimals.validator'; // import del custom validator

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del empleado' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del empleado' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 30, description: 'Edad del empleado' })
  @IsInt()
  @IsOptional()
  age?: number;

  @ApiProperty({ example: 12345679, description: 'DNI único del empleado' })
  @IsInt()
  dni: number;

  @ApiProperty({ example: '20-12345678-9', description: 'CUIL único del empleado' })
  @IsString()
  @IsNotEmpty()
  cuil: string;

  @ApiProperty({ example: '+54 9 11 1234-5678', required: false })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ example: 'Av. Siempre Viva 123', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '1995-05-12', description: 'Fecha de nacimiento', required: false })
  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @ApiProperty({ example: 'https://cdn.com/empleado.png', required: false })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ApiProperty({
    example: 75000.5,
    description: 'Sueldo del empleado',
    required: false,
    type: 'number',
    format: 'float'
  })
  @IsOptional()
  @IsNumber()
  @MaxTwoDecimals({ message: 'El sueldo debe tener como máximo dos decimales' })
  salary?: number;

  @ApiProperty({ example: 'juan.perez@email.com', description: 'Correo electrónico del empleado' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
