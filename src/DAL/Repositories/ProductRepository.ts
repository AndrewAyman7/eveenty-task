import { Product } from '../Entities/Product/ProductEntity';
import { GenericRepository } from './Generic/GenericRepository';

export class ProductRepository extends GenericRepository<Product> {
  constructor() {
    super(Product);
  }
}