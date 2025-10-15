import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsUUID, IsOptional } from 'class-validator';

export class UpdateAbsenceDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del empleado (opcional)',
    required: false
  })
  @IsOptional()
  @IsUUID()
  employee_id?: string;

  @ApiProperty({
    example: '2024-01-15',
    description: 'Fecha de inicio de la ausencia (opcional)',
    required: false
  })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiProperty({
    example: '2024-01-17',
    description: 'Fecha de fin de la ausencia (opcional)',
    required: false
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiProperty({
    example: 'Vacaciones familiares actualizadas',
    description: 'Motivo de la ausencia (opcional)',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;
}
