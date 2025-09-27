import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../../Shared/Enums/UserRole.enum';
import { UserRepository } from '../../DAL/Repositories/UserRepository';

const userRepo = new UserRepository();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await userRepo.findOne({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    req.user = {
      id: user.id,
      role: user.role as UserRole,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

declare module 'express' {
  interface Request {
    user?: { id: number; role: UserRole };
  }
}