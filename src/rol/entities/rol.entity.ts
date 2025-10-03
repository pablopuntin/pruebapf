import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  // @OneToMany('User', 'rol')
  // users: any[];
}
