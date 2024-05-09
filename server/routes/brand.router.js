import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import BrandController from '../controllers/brand.controller.js';

const router = new Router();

router.post('/create', catchError(BrandController.create));
router.get('/', catchError(BrandController.getAll));
router.get('/:id', catchError(BrandController.getOne));
router.delete('/delete', catchError(BrandController.remove));

export default router;
