import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ProductService } from '../../BL/Product/Service/ProductService';
import { CreateProductDto } from '../../BL/Product/DTOs/CreateProductDto';
import { UpdateProductDto } from '../../BL/Product/DTOs/UpdateProductDto';

const productService = new ProductService();

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.listProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const dto = plainToClass(CreateProductDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})) });
  }

  try {
    const product = await productService.createProduct(dto);
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const dto = plainToClass(UpdateProductDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})) });
  }

  try {
    const result = await productService.updateProduct(parseInt(req.params.id), dto);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const message = await productService.deleteProduct(parseInt(req.params.id));
    res.json({ message });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};