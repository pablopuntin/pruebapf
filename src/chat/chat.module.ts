import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { ChatParticipant } from './entities/chat-participant.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Message, ChatParticipant, User]),
    JwtModule.register({}) // Para validar tokens en WebSockets
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService, ChatGateway]
})
export class ChatModule {}
