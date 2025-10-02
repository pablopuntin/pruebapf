import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Company } from '../../empresa/entities/empresa.entity';
import { Plan } from '../../plan/entities/plan.entity';

@Entity('subscription')
export class Suscripcion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  plan_id: string;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({ unique: true })
  token: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Plan, (plan) => plan.suscripciones)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;
}
