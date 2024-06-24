import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import roleController from '../controllers/role.controller.js';
import { ROLE } from '../constants/roles.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';

const router = new Router();

router.post(
  '/create',
  checkRoleMiddleware([ROLE.MANAGER]),
  catchError(roleController.create)
);

router.get('/', catchError(roleController.getAll));
router.get('/:id', catchError(roleController.getOne));

router.delete(
  '/delete',
  checkRoleMiddleware([ROLE.MANAGER]),
  catchError(roleController.remove)
);

export default router;
