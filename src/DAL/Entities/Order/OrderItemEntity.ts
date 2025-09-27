import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './OrderEntity';
import { Product } from '../Product/ProductEntity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Order, (o) => o.items, { onDelete: 'CASCADE' })
  order!: Order;

  @ManyToOne(() => Product)
  product!: Product;

  @Column('int')
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;
}