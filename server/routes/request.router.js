import Router from 'express';
import catchError from '../middlewares/catchErrorMiddleware.js';
import requestController from '../controllers/request.controller.js';

const router = new Router();

router.post('/', catchError(requestController.send));

export default router;
