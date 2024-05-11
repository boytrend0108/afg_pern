import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import OrderController from '../controllers/order.contorller.js';

const router = new Router();

router.post('/', catchError(OrderController.add));
router.get('/:userId', catchError(OrderController.getAll));
router.delete('/delete', catchError(OrderController.delete));

export default router;
