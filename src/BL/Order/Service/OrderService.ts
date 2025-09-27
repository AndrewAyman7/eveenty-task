import { stripe } from "../../../Config/stripe";
import { OrderItemRepository } from "../../../DAL/Repositories/OrderItemRepository";
import { OrderRepository } from "../../../DAL/Repositories/OrderRepository";
import { UserRepository } from "../../../DAL/Repositories/UserRepository";
import { ProductService } from "../../Product/Service/ProductService";
import { CreateOrderDto } from "../DTOs/CreateOrderDto";

const orderRepo = new OrderRepository();
const itemRepo = new OrderItemRepository();
const userRepo = new UserRepository();
const productService = new ProductService();

export class OrderService {
  async createOrder(userId: number, dto: CreateOrderDto): Promise<any> {
    let total = 0;
    const itemDetails: { product: { id: number }, quantity: number, price: number }[] = [];

    for (const item of dto.items) {
      const product = await productService.getProductById(item.productId);
      if (!product) throw new Error('Product not found');
      const subtotal = product.price * item.quantity;
      total += subtotal;
      itemDetails.push({ product: { id: item.productId } as any, quantity: item.quantity, price: product.price });
    }

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (!user.stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({ email: user.email, name: user.name || undefined });
      user.stripeCustomerId = stripeCustomer.id;
      await userRepo.save(user);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'usd',
      customer: user.stripeCustomerId!,
      payment_method: dto.paymentMethodId,
      off_session: true,
      confirm: true,
    });

    if (paymentIntent.status !== 'succeeded') throw new Error('Payment failed');

    const order = await orderRepo.createOne({
      user: { id: userId } as any,
      amount: total,
      status: 'completed',
      items: [], 
    });

    for (const detail of itemDetails) {
      await itemRepo.createOne({ ...detail, order: { id: order.id } as any });
    }

    return order;
  }
}