import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, Matches } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({
    example: 'Gerente',
    description: 'Nombre del puesto/cargo',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El nombre debe contener solo letras y espacios'
  })
  name: string;

  @ApiProperty({
    example: 'Gerente a cargo de la empresa',
    description: 'Descripción detallada del puesto',
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;
}
