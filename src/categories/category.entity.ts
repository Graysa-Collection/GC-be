import { ParentCategory } from '@/parent_categories/parent_categories.entity';
import { Product } from '@/products/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

  @ManyToOne(
    () => ParentCategory,
    (parentCategory) => parentCategory.categories,
  )
  @JoinColumn({ name: 'parent_category_id' })
  parentCategory: ParentCategory;
}
