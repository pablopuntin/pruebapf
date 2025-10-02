import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';
import { Company } from '../../empresa/entities/empresa.entity';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company, (company) => company.employees, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ unique: true, type: 'int' })
  dni: number;

  @Column()
  cuil: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ name: 'domicilio_laboral', nullable: true })
  address: string;

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ type: 'float', nullable: true })
  salary: number;

  @Column()
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
