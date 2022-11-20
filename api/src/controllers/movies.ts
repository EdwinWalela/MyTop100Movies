import { Request, Response, NextFunction } from 'express';
import Movie from '../models/Movie';
import service from '../services/movies';
import movieDbAPI from '../providers/MovieDb';
import MovieListItem from '../models/MovieListItem';

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

const addMovie = async (req: Request, res: Response, next: NextFunction) => {
	let movieId = req.body.movieId;
	let userId = req.userId;
	console.log(userId);
	if (!movieId) {
		return res.status(400).send({
			error: 'Movie id is required',
		});
	}

	try {
		await service.addMovie(movieId, userId);
	} catch (error: any) {
		return res.status(400).send({
			error: error.message,
		});
	}

	return res.status(201).send({
		message: 'Movie added to list',
	});
};

const getUserMovieList = async (req: Request, res: Response, next: NextFunction) => {
	let userId = req.userId;
	let movies: MovieListItem[] = [];

	try {
		movies = await service.getUserMovieList(userId);
	} catch (error: any) {
		return res.status(400).send({
			error: error.message,
		});
	}

	return res.send({
		movies,
	});
};

export default { searchMovie, getMovieList, addMovie, getUserMovieList };
