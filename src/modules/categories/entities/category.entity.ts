import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({
    length: '50',
  })
  name: string;
  @Column({ nullable: true })
  position?: number;
  @Column({default: false})
  root?: boolean;
  @CreateDateColumn()
  createAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @ManyToOne((type) => Category, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Category
  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[]
}
