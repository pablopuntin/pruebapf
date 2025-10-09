import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('notification_configs')
export class NotificationConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: true })
  email_notifications: boolean;

  @Column({ default: true })
  immediate_notifications: boolean;

  @Column({ default: 'AR' })
  country: string; // Código de país para feriados
}
