import express from 'express';
import controller from '../controllers/movies';

const router = express.Router();

router.get('/', controller.getMovieList);
router.get('/search', controller.searchMovie);

export default router;
