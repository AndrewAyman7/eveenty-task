import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UserService } from '../../BL/User/Service/UserService';
import { AddPaymentMethodDto } from '../../BL/User/DTOs/PaymentMethodDto';

const userService = new UserService();

export const addPaymentMethod = async (req: Request, res: Response) => {
  const dto = plainToClass(AddPaymentMethodDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})) });
  }

  try {
    await userService.addPaymentMethod((req as any).user.id, dto.paymentMethodId);
    res.status(201).json({ message: 'Payment method added' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePaymentMethod = async (req: Request, res: Response) => {
  try {
    await userService.deletePaymentMethod((req as any).user.id, parseInt(req.params.id));
    res.json({ message: 'Payment method deleted' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await userService.getOrders((req as any).user.id);
    res.json(orders);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};