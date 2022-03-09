import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdminAction } from 'src/modules/admin-action/admin-action.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ nullable: false })
  name: string;
  @OneToMany(() => AdminAction, (adminAction) => adminAction.user)
  actions: AdminAction[];
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
