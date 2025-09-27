import { Router } from 'express';
import * as adminController from '../Controllers/AdminController';

const router = Router();

router.get('/sales', adminController.getSalesReport);

export const adminRoutes = router;