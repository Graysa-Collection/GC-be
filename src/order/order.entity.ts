import { OrderedItem } from '@/ordered-items/ordered-items.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToMany(() => OrderedItem, (item) => item.order)
  orderedItems: OrderedItem[];
}
