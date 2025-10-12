import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ChatType } from '../entities/chat.entity';

export class UpdateChatDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ChatType)
  type?: ChatType;
}

