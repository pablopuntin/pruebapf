import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Entity('empresa')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  razon_social: string;

  @Column({ nullable: true })
  direccion: string;

  @Column({ type: 'bigint', nullable: true })
  telefono: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  logo: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  // Relaciones
  @OneToMany(() => Empleado, (empleado) => empleado.empresa)
  empleados: Empleado[];
}
