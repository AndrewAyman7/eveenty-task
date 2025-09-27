import { Router } from 'express';
import * as userController from '../Controllers/UserController';

const router = Router();

router.post('/payment-methods', userController.addPaymentMethod);
router.delete('/payment-methods/:id', userController.deletePaymentMethod);
router.get('/orders', userController.getOrders);

export const userRoutes = router;