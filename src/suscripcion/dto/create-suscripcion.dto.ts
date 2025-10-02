import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

export class CreateSuscripcionDto {
  @ApiProperty({ example: 'uuid-de-empresa', description: 'ID de la empresa' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  company_id: string;

  @ApiProperty({ example: 'uuid-de-plan', description: 'ID del plan' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  plan_id: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Fecha de inicio de la suscripción'
  })
  @IsDateString()
  start_date: Date;

  @ApiProperty({
    example: '2024-12-31T23:59:59.999Z',
    description: 'Fecha de fin de la suscripción'
  })
  @IsDateString()
  end_date: Date;
}
