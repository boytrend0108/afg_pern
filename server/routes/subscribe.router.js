import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import subscribeController from '../controllers/subscribe.controller.js';

const router = new Router();

router.post('/', catchError(subscribeController.subscribe));
router.get('/all', catchError(subscribeController.getAll));
router.delete('/delete/:email', catchError(subscribeController.unsubscribe));

export default router;
