import { IsString, IsOptional, IsEnum, IsArray, IsUUID } from 'class-validator';
import { ChatType } from '../entities/chat.entity';

export class CreateChatDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ChatType)
  type: ChatType;

  @IsArray()
  @IsUUID('4', { each: true })
  participant_ids: string[];
}

