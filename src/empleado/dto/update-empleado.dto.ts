import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-empleado.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
