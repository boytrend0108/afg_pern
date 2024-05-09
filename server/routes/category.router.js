import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import CategoryController from '../controllers/category.controller.js';

const router = new Router();

router.post('/create', catchError(CategoryController.create));
router.get('/', catchError(CategoryController.getAll));
router.get('/:id', catchError(CategoryController.getOne));
router.delete('/delete', catchError(CategoryController.remove));

export default router;
