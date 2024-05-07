import Router from 'express';
import userController from '../controllers/user.controller.js';
import catchError from '../middlewares/catchErrorMiddleware.js';

const router = new Router();

router.post('/registration', catchError(userController.register));
router.post('/login');
router.get('/', (req, res) => {
  res.send('worcl');
});
router.put('/');
router.delete('/');

export default router;
