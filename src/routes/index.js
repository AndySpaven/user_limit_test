import express from 'express';
import streamRoute from './stream';

const router = express.Router();

export const rootRoute = (req, res) => {
  res.render('index', { title: 'Express' });
};

/* GET home page. */
router.get('/', rootRoute);
router.get('/user/:name/stream/:id', streamRoute);
export default router;
