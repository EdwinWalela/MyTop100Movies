import { Request, Response, NextFunction } from 'express';
import Movie from '../models/Movie';
import movieDbAPI from '../providers/MovieDb';

const getMovieList = async (req: Request, res: Response, next: NextFunction) => {
	let movies: Movie[] = [];
	let page = req.query.page ? Number(req.query.page) : 1;
	try {
		movies = await movieDbAPI.getMovieList(page);
	} catch (error: any) {
		return res.status(400).send({
			error: error.message,
		});
	}
	return res.send({
		movies,
	});
};

const searchMovie = async (req: Request, res: Response, next: NextFunction) => {
	let movies: Movie[] = [];
	let query = req.query.query ? String(req.query.query) : '';

	if (!query || query === '') {
		return res.status(400).send({
			error: 'Query is required',
		});
	}
	try {
		movies = await movieDbAPI.movieSearch(query);
	} catch (error: any) {
		return res.status(400).send({
			error: error.message,
		});
	}
	return res.send({
		movies,
	});
};

export default { searchMovie, getMovieList };
