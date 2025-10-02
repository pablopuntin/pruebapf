import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({
    example: 'Gerente',
    description: 'Nombre del puesto/cargo'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'Gerente a cargo de la empresa',
    description: 'Descripción detallada del puesto'
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
