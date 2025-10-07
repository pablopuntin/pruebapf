import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEmployeeDto } from 'src/empleado/dto/create-empleado.dto';

export class RegistroInicialDto {
  @ApiProperty({ type: () => CreateEmployeeDto })
  @ValidateNested()
  @Type(() => CreateEmployeeDto)
  empresa: CreateEmployeeDto;

  @ApiProperty({ example: 'admin@empresa.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'https://cdn.com/perfil.png', required: false })
  @IsString()
  profile_image_url?: string;
}
