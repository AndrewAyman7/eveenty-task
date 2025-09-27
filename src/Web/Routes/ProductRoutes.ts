import { Router } from 'express';
import * as productController from '../Controllers/ProductController';

const router = Router();

router.get('/', productController.listProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export const productRoutes = router;