import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { ParticipantRole } from '../entities/chat-participant.entity';

export class AddParticipantDto {
  @IsUUID()
  user_id: string;

  @IsOptional()
  @IsEnum(ParticipantRole)
  role?: ParticipantRole;
}

