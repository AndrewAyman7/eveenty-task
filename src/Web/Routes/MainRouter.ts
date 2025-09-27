import { Router } from 'express';
import { authMiddleware } from '../Middlewares/authMiddleware';
import { adminMiddleware } from '../Middlewares/adminMiddleware';
import { authRoutes } from './AuthRoutes';
import { userRoutes } from './UserRoutes';
import { productRoutes } from './ProductRoutes';
import { orderRoutes } from './OrderRoutes';
import { adminRoutes } from './AdminRoutes';

export class MainRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {

    this.router.use('/auth', authRoutes);        
    this.router.use('/users/me', authMiddleware, userRoutes);         
    this.router.use('/products', authMiddleware,  productRoutes);     
    this.router.use('/orders', authMiddleware, orderRoutes);          

    this.router.use('/admin', authMiddleware, adminMiddleware, adminRoutes);
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export const mainRoutes: Router = new MainRouter().getRoutes();