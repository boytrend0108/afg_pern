import Router from 'express';
import brandRouter from './brand.router.js';
import categoryRouter from './category.router.js';
import favoriteRouter from './favorite.router.js';
import orderRouter from './order.router.js';
import productRouter from './product.router.js';
import reserveRouter from './reserve.router.js';
import roleRouter from './role.router.js';
import userRouter from './user.router.js';

const router = new Router();

router.use('/brand', brandRouter);
router.use('/category', categoryRouter);
router.use('/favorite', favoriteRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/reserve', reserveRouter);
router.use('/role', roleRouter);
router.use('/user', userRouter);

export default router;
