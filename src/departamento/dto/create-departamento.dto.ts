import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDepartamentoDto {
  @ApiProperty({
    example: 'Recursos Humanos',
    description: 'Nombre del departamento'
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    example: 'Departamento encargado de gestionar el personal de la empresa',
    description: 'Descripción del departamento'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  descripcion: string;
}
