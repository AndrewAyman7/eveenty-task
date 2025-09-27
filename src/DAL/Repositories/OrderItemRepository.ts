import { OrderItem } from '../Entities/Order/OrderItemEntity';
import { GenericRepository } from './Generic/GenericRepository';

export class OrderItemRepository extends GenericRepository<OrderItem> {
  constructor() {
    super(OrderItem);
  }
}