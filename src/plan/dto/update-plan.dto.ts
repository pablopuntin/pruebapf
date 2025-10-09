import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  Min,
  MaxLength
} from 'class-validator';

export class UpdatePlanDto {
  @ApiPropertyOptional({
    example: 'Plan Premium',
    description: 'Nombre del plan (opcional)',
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    example: 49.99,
    description: 'Precio del plan (opcional)',
    minimum: 0.01
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({
    example: 60,
    description: 'Duración del plan en días (opcional)',
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  duration_days?: number;
}
