import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Employee } from 'src/empleado/entities/empleado.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trade_name: string;

  @Column()
  legal_name: string;

  @Column({ unique: true })
  razon_social: string;

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
    name: 'fecha_update'
  })
  update_at: Date;

  // Relaciones
@OneToMany(() => Employee, (employee) => employee.company)
employees: Employee[];
}
