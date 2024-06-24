import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import CategoryController from '../controllers/category.controller.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';
import { ROLE } from '../constants/roles.js';

const router = new Router();
router.post(
  '/create',
  checkRoleMiddleware([ROLE.MANAGER]),
  catchError(CategoryController.create)
);

router.get('/', catchError(CategoryController.getAll));
router.get('/:id', catchError(CategoryController.getOne));

router.delete(
  '/delete/:id',
  checkRoleMiddleware([ROLE.MANAGER]),
  catchError(CategoryController.remove)
);

export default router;
