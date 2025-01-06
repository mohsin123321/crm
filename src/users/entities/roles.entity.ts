import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';
import { RolesType } from './roles-type.enum';
import { User } from './users.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: RolesType;

  @OneToOne(() => User, (user) => user.role)
  user: User;
}
