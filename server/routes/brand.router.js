import Router from 'express';

const router = new Router();

router.post('/');
router.get('/', (req, res) => {
  res.send('brand');
});
router.put('/');
router.delete('/');

export default router;
