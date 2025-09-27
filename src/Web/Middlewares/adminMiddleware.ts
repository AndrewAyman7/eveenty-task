import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../../Shared/Enums/UserRole.enum';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== UserRole.ADMIN) return res.status(403).json({ error: 'Forbidden' });
  next();
};