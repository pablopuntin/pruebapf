import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';
import { Company } from '../../empresa/entities/empresa.entity';
import { Departamento } from 'src/departamento/entities/departamento.entity';
import { User } from 'src/user/entities/user.entity';
import { Position } from 'src/position/entities/position.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company, (company) => company.employees, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Departamento, (department) => department.employees)
  @JoinColumn({ name: 'department_id' })
  department: Departamento;

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Position, (position) => position.employees)
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

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

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true
  })
  deletedAt?: Date | null;
}
