import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn
} from 'typeorm';
// import { Usuario } from '../../usuario/entities/usuario.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';
// import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity('empleado')
export class Empleado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Usuario, (usuario) => usuario.empleados, { eager: true })
  // @JoinColumn({ name: 'usuario_id' })
  // usuario: Usuario;

  @ManyToOne(() => Empresa, (empresa) => empresa.empleados, { eager: true })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  // @ManyToOne(() => Categoria, (categoria) => categoria.empleados, { eager: true })
  // @JoinColumn({ name: 'categoria_id' })
  // categoria: Categoria;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ type: 'int' })
  edad: number;

  @Column({ unique: true, type: 'int' })
  dni: number;

  @Column({ unique: true })
  cuil: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ name: 'domicilio_laboral', nullable: true })
  domicilioLaboral: string;

  @Column({ type: 'date', nullable: true })
  cumpleaños: Date;

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
  fechaNacimiento: Date;

  @Column({ nullable: true })
  imagen: string;

  @Column({ type: 'float', nullable: true })
  sueldo: number;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
