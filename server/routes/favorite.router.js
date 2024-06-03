import Router from 'express';
import favoriteController from '../controllers/favorite.controller.js';
import catchError from '../middlewares/catchErrorMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = new Router();

router.post('/add', authMiddleware, catchError(favoriteController.add));

router.get(
  '/:userId',
  // authMiddleware,
  catchError(favoriteController.getByUserId)
);

router.delete(
  '/delete/:productId/:userId',
  // authMiddleware,
  catchError(favoriteController.remove)
);

export default router;
