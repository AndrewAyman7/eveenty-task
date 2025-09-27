import { Order } from '../Entities/Order/OrderEntity';
import { GenericRepository } from './Generic/GenericRepository';
import { MoreThanOrEqual, LessThanOrEqual, ILike } from 'typeorm';

export class OrderRepository extends GenericRepository<Order> {
  constructor() {
    super(Order);
  }

  async getSalesReport(from?: Date, to?: Date, userName?: string): Promise<[number, number]> {
    const where: any = {};

    if (from) {
      where.createdAt = MoreThanOrEqual(from);
    }
    if (to) {
      where.createdAt = to ? LessThanOrEqual(to) : where.createdAt;
    }

    if (userName) {
      where.user = { name: ILike(`%${userName}%`) };
    }

    const orders = await this.getRepo().find({ where, relations: ['user'] });

    const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.amount) || 0), 0);
    const orderCount = orders.length;

    return [totalRevenue, orderCount];
  }
}