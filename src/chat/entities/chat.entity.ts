import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Message } from './message.entity';
import { ChatParticipant } from './chat-participant.entity';

export enum ChatType {
  DIRECT = 'direct',
  GROUP = 'group'
}

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ChatType,
    default: ChatType.DIRECT
  })
  type: ChatType;

  @Column({ type: 'uuid' })
  created_by: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Message[];

  @OneToMany(() => ChatParticipant, (participant) => participant.chat, {
    cascade: true
  })
  participants: ChatParticipant[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;
}
