import express from 'express';
import controller from '../controllers/movies';
import verifyToken from '../middleware/tokenVerification';

const router = express.Router();

router.get('/', verifyToken, controller.getMovieList);
router.get('/search', verifyToken, controller.searchMovie);
router.post('/', verifyToken, controller.addMovie);
router.get('/:id', verifyToken, controller.getUserMovieList);

export default router;
