import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsUUID
} from 'class-validator';

export class UpdateSuscripcionDto {
  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID de la empresa (opcional)',
    format: 'uuid'
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  company_id?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del plan (opcional)',
    format: 'uuid'
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  plan_id?: string;

  @ApiPropertyOptional({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Fecha de inicio de la suscripción (opcional)'
  })
  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @ApiPropertyOptional({
    example: '2024-12-31T23:59:59.999Z',
    description: 'Fecha de fin de la suscripción (opcional)'
  })
  @IsOptional()
  @IsDateString()
  end_date?: Date;
}
