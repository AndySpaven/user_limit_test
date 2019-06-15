import express from 'express';

const router = express.Router();

export const rootRoute = (req, res) => {
  res.render('index', { title: 'Express' });
};

/* GET home page. */
router.get('/', rootRoute);

export default router;
