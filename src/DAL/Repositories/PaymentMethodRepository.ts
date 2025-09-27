import { GenericRepository } from './Generic/GenericRepository';
import { PaymentMethod } from '../Entities/Payment/PaymentMethodEntity';

export class PaymentMethodRepository extends GenericRepository<PaymentMethod> {
  constructor() {
    super(PaymentMethod);
  }
}