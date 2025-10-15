import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateNotificationConfigDto {
  @ApiPropertyOptional({
    description: 'Habilitar notificaciones por email',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  email_notifications?: boolean;

  @ApiPropertyOptional({
    description: 'Habilitar notificaciones inmediatas',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  immediate_notifications?: boolean;

  @ApiPropertyOptional({
    description: 'Código de país para recordatorios de feriados',
    example: 'AR',
    maxLength: 2
  })
  @IsOptional()
  @IsString()
  @MaxLength(2)
  country?: string;
}
