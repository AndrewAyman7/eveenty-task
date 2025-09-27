import { stripe } from '../../../Config/stripe';
import { OrderRepository } from '../../../DAL/Repositories/OrderRepository';
import { PaymentMethodRepository } from '../../../DAL/Repositories/PaymentMethodRepository';
import { UserRepository } from '../../../DAL/Repositories/UserRepository';


const userRepo = new UserRepository();
const pmRepo = new PaymentMethodRepository();
const orderRepo = new OrderRepository();

export class UserService {
  async addPaymentMethod(userId: number, paymentMethodId: string): Promise<void> {
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      try {
        const stripeCustomer = await stripe.customers.create({ email: user.email, name: user.name || undefined });
        stripeCustomerId = stripeCustomer.id;
        user.stripeCustomerId = stripeCustomerId;
        await userRepo.save(user);
      } catch (error: any) {
        throw new Error(`Failed to create Stripe customer: ${error.message}`);
      }
    }

    try {
      const pm = await stripe.paymentMethods.attach(paymentMethodId, { customer: stripeCustomerId });
      await pmRepo.createOne({
        user: { id: userId } as any,
        stripePmId: pm.id,
        last4: pm.card!.last4,
        brand: pm.card!.brand,
        expMonth: pm.card!.exp_month,
        expYear: pm.card!.exp_year,
      });
    } catch (error: any) {
      throw new Error(`Failed to attach payment method: ${error.message}`);
    }
  }

  async deletePaymentMethod(userId: number, pmId: number): Promise<void> {
    const pm = await pmRepo.findOne({ where: { id: pmId, user: { id: userId } } });
    if (!pm) throw new Error('Payment method not found');

    await stripe.paymentMethods.detach(pm.stripePmId);
    await pmRepo.delete({ id: pmId });
  }

  async getOrders(userId: number): Promise<any[]> {
    const results = await orderRepo.findMany({ where: { user: { id: userId } } });
    return results;
  }
}