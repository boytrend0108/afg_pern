import Router from 'express';

const router = new Router();

router.post('/registration');
router.post('/login');
router.get('/', (req, res) => {
  res.send('worcl');
});
router.put('/');
router.delete('/');

export default router;
