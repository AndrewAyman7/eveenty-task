import { ProductRepository } from "../../../DAL/Repositories/ProductRepository";
import { CreateProductDto } from "../DTOs/CreateProductDto";
import { UpdateProductDto } from "../DTOs/UpdateProductDto";

const productRepo = new ProductRepository();

export class ProductService {
  async createProduct(data: CreateProductDto): Promise<any> {
    return productRepo.createOne(data);
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<any> {
    return productRepo.updateOne({ id }, data);
  }

  async deleteProduct(id: number): Promise<string> {
    return productRepo.delete({ id });
  }

  async listProducts(): Promise<any[]> {
    const results = await productRepo.findMany({});
    return results;
  }

  async getProductById(id: number): Promise<any | null> {
    return productRepo.findOne({ where: { id } });
  }
}