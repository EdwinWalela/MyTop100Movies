import db from '../config/db';
import MovieListItem from '../models/MovieListItem';

const addMovieQuery = `INSERT into "MovieList" (id,"userId") VALUES ($1,$2)`;
const getUserMoviesQuery = `SELECT * FROM "MovieList" WHERE "userId" = $1`;

const addMovie = async (movieId: number, userId: number) => {
	let res;
	try {
		res = await db.query(addMovieQuery, [movieId, userId]);
	} catch (error: any) {
		console.error('failed to save user movie', error);
		throw new Error(error.message);
	}
};

const getUserMovieList = async (userId: number): Promise<MovieListItem[]> => {
	let res;
	let movieList: MovieListItem[] = [];
	try {
		res = await db.query(getUserMoviesQuery, [userId]);
	} catch (error: any) {
		console.error('failed to get user movie list', error);
		throw new Error(error.message);
	}

	for (const item of res.rows) {
		let movieItem = new MovieListItem(item.id, item.userId, item.id);
		movieList.push(movieItem);
	}

	return movieList;
};

export default {
	getUserMovieList,
	addMovie,
};
