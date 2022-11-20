import express from 'express';
import controller from '../controllers/movies';

const router = express.Router();

router.get('/', controller.getMovieList);
router.get('/search', controller.searchMovie);
router.post('/', controller.addMovie);
router.get('/:id', controller.getUserMovieList);

export default router;
