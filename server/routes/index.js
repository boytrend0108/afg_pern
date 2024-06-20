import Router from 'express';
import brandRouter from './brand.router.js';
import basketRouter from './basket.router.js';
import categoryRouter from './category.router.js';
import favoriteRouter from './favorite.router.js';
import orderRouter from './order.router.js';
import productRouter from './product.router.js';
import reserveRouter from './reserve.router.js';
import roleRouter from './role.router.js';
import userRouter from './user.router.js';
import requestRouter from './request.router.js';
import subscribeRouter from './subscribe.router.js';
import imageRouter from './image.router.js';

const router = new Router();

router.use('/brand', brandRouter);
router.use('/basket', basketRouter);
router.use('/category', categoryRouter);
router.use('/favorite', favoriteRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/reserve', reserveRouter);
router.use('/role', roleRouter);
router.use('/user', userRouter);
router.use('/request', requestRouter);
router.use('/subscribe', subscribeRouter);
router.use('/thumbnail', imageRouter);

export default router;
