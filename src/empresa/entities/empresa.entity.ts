import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Employee } from 'src/empleado/entities/empleado.entity';
import { User } from 'src/user/entities/user.entity';
import { Suscripcion } from 'src/suscripcion/entities/suscripcion.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trade_name: string;

  @Column()
  legal_name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  logo: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  created_at: Date;

  @DeleteDateColumn({ name: 'fecha_deteted' })
  deletedAt?: Date;

  @Column({
    name: 'fecha_update',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  update_at: Date;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Suscripcion, (suscripcion) => suscripcion.company)
  suscripciones: Suscripcion[];
}
