import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Rol } from 'src/rol/entities/rol.entity';
import { Company } from 'src/empresa/entities/empresa.entity';
import { Employee } from 'src/empleado/entities/empleado.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  // ✅ No debe ser unique — evita conflictos si luego dos usuarios comparten password (hash idéntico)
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  first_name?: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true
  })
  last_name?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  profile_image_url?: string;

  @ManyToOne(() => Rol, (rol) => rol.users, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Rol;

  // ✅ permite undefined o null según la creación
  @ManyToOne(() => Company, (company) => company.users, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Company | null;

  @ManyToOne(() => Employee, (employee) => employee.user, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee?: Employee | null;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true
  })
  deleted_at?: Date | null;
}
