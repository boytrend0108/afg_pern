import Router from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import catchError from '../middlewares/catchErrorMiddleware.js';
import reserveController from '../controllers/reserve.controller.js';

const router = new Router();

router.post('/', catchError(reserveController.add));
router.get('/:userId', catchError(reserveController.getAll));
router.delete('/delete', catchError(reserveController.delete));

export default router;
