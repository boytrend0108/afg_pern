import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import imageController from '../controllers/image.controller.js';

const router = new Router();

router.get('/', catchError(imageController.get));

export default router;
