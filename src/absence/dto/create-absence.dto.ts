import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

export class CreateAbsenceDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del empleado'
  })
  @IsUUID()
  @IsNotEmpty()
  employee_id: string;

  @ApiProperty({
    example: '2024-01-15',
    description: 'Fecha de inicio de la ausencia'
  })
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({
    example: '2024-01-17',
    description: 'Fecha de fin de la ausencia'
  })
  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @ApiProperty({
    example: 'Vacaciones familiares',
    description: 'Motivo de la ausencia',
    required: false
  })
  @IsString()
  description?: string;
}
