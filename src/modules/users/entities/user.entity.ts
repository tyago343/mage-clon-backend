import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AdminAction } from '../../admin-action/admin-action.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  lastName: string;
  @Column({ nullable: false, unique: true })
  username: string;
  @Column()
  @Exclude()
  password: string;
  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;
  @OneToMany(() => AdminAction, (adminAction) => adminAction.user)
  actions?: AdminAction[];
  @CreateDateColumn()
  createAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  async comparePassword(password: string): Promise<boolean> {
    const result = await bcrypt.compare(password, this.password);
    return result;
  }
}
