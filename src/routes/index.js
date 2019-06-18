import express from 'express';

export default ({ route }) => {
  const root = (req, res) => {
    res.render('index', { title: 'Express' });
  };

  return {
    router() {
      const router = express.Router();
      router.get('/', root);
      router.get('/user/:name/stream/:id', route);
      router.delete('/user/:name/stream/:id', route);

      return router;
    },
  };
};
