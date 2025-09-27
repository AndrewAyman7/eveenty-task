import { Router } from 'express';
import * as orderController from '../Controllers/OrderController';

const router = Router();

router.post('/', orderController.createOrder);

export const orderRoutes = router;