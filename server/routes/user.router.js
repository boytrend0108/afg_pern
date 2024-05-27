import Router from 'express';
import userController from '../controllers/user.controller.js';
import catchError from '../middlewares/catchErrorMiddleware.js';
import { ROLE } from '../constants/roles.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';

const router = new Router();

router.post('/registration', catchError(userController.register));
router.get('/activate/:activationToken', catchError(userController.activate));
router.post('/login', catchError(userController.login));
router.post('/logout', catchError(userController.logout));
router.post('/update', catchError(userController.update));

router.post(
  '/add-role',
  checkRoleMiddleware(ROLE.ADMIN),
  catchError(userController.addRole)
);
router.delete(
  '/delete-role',
  checkRoleMiddleware(ROLE.ADMIN),
  catchError(userController.deleteRole)
);

router.get('/', catchError(userController.getAll));
router.get('/:id', catchError(userController.getById));

export default router;
