import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { OrderService } from '../../BL/Order/Service/OrderService';
import { CreateOrderDto } from '../../BL/Order/DTOs/CreateOrderDto';

const orderService = new OrderService();

export const createOrder = async (req: Request, res: Response) => {
  const dto = plainToClass(CreateOrderDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})) });
  }

  try {
    const order = await orderService.createOrder((req as any).user.id, dto);
    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};