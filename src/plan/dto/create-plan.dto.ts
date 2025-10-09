import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  MaxLength
} from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({
    example: 'Plan Básico',
    description: 'Nombre del plan',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 29.99,
    description: 'Precio del plan'
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 30,
    description: 'Duración del plan en días'
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  duration_days: number;
}
