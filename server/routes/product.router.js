import Router from 'express';
import productController from '../controllers/product.controller.js';
import catchError from '../middlewares/catchErrorMiddleware.js';

const router = new Router();

router.post('/create', catchError(productController.create));
router.get('/', catchError(productController.getAll));
router.get('/:id', catchError(productController.getOne));
router.delete('/delete', catchError(productController.remove));
router.patch('/update', catchError(productController.update));

export default router;
