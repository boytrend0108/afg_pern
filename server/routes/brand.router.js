import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import BrandController from '../controllers/brand.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';
import { ROLE } from '../constants/roles.js';

const router = new Router();

router.post(
  '/create',
  checkRoleMiddleware([ROLE.MANAGER]),
  catchError(BrandController.create)
);
router.get('/', catchError(BrandController.getAll));
router.get('/:id', catchError(BrandController.getOne));
router.delete(
  '/delete/:id',
  checkRoleMiddleware([ROLE.MANAGER]),
  catchError(BrandController.remove)
);

export default router;
