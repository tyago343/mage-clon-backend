import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/entities';

@Entity()
export class AdminAction {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  category: string;
  @ManyToOne(() => User, (user) => user.actions, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
