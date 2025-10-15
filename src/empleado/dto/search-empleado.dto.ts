// src/empleado/dto/search-empleado.dto.ts
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchEmpleadoDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'ID del empleado (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'DNI del empleado',
    example: 12345678,
  })
  dni?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Apellido del empleado',
    example: 'Pérez',
  })
  last_name?: string;
}
