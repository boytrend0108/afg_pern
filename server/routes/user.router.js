import Router from 'express';
import userController from '../controllers/user.controller.js';
import catchError from '../middlewares/catchErrorMiddleware.js';

const router = new Router();

router.post('/registration', catchError(userController.register));
router.post('/login', catchError(userController.login));
router.post('/logout', catchError(userController.logout));

router.post('/add-role', catchError(userController.addRole));
router.delete('/delete-role', catchError(userController.deleteRole));

router.get('/', catchError(userController.getAll));
router.get('/:id', catchError(userController.getById));

export default router;
