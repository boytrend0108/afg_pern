import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import roleController from '../controllers/role.controller.js';

const router = new Router();

router.post('/create', catchError(roleController.create));
router.get('/', catchError(roleController.getAll));
router.get('/:id', catchError(roleController.getOne));
router.delete('/delete', catchError(roleController.remove));

export default router;
