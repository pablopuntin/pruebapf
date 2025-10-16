import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, Matches } from 'class-validator';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDepartamentoDto {
  @ApiProperty({
    example: 'Recursos Humanos',
    description: 'Nombre del departamento',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
    message: 'El nombre debe contener solo letras y espacios'
  })
  nombre: string;

  @ApiProperty({
    example: 'Departamento encargado de gestionar el personal de la empresa',
    description: 'Descripción del departamento',
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  descripcion: string;
}
