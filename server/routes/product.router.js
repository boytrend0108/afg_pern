import Router from 'express';
import productController from '../controllers/product.controller.js';
import catchError from '../middlewares/catchErrorMiddleware.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';
import { ROLE } from '../constants/roles.js';

const router = new Router();

router.post(
  '/create',
  checkRoleMiddleware([ROLE.MANAGER]),
  catchError(productController.create)
);

router.get('/', catchError(productController.getAll));
router.get('/:id', catchError(productController.getOne));

router.delete(
  '/delete/:id',
  checkRoleMiddleware([ROLE.MANAGER]),
  catchError(productController.remove)
);

router.patch(
  '/update',
  checkRoleMiddleware([ROLE.MANAGER]),
  catchError(productController.update)
);

export default router;
