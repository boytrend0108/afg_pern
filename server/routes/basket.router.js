import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import basketController from '../controllers/basket.controller.js';

const router = new Router();

router.get('/:userId', authMiddleware, catchError(basketController.get));
router.post('/', authMiddleware, catchError(basketController.addItem));
router.delete(
  '/delete',
  authMiddleware,
  catchError(basketController.removeItem)
);

export default router;
