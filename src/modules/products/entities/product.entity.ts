import { Category } from "src/modules/categories/entities";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  price: string;
  @Column({ nullable: false })
  description: string;
  @ManyToMany(() => Category, (category) => category.products, { cascade: true })
  @JoinTable()
  categories: Category[]
}