import { OrderRepository } from "../../../DAL/Repositories/OrderRepository";

const orderRepo = new OrderRepository();

export class AdminService {
  async getSalesReport(from?: string, to?: string, userName?: string): Promise<{ totalRevenue: number; orderCount: number }> {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;
    const [totalRevenue, orderCount] = await orderRepo.getSalesReport(fromDate, toDate, userName);
    return { totalRevenue, orderCount };
  }
}