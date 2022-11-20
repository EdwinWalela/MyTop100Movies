import MovieListItem from '../models/MovieListItem';
import repository from '../repositories/movies';

const addMovie = async (movieId: number, userId: number) => {
	await repository.addMovie(movieId, userId);
};

const getUserMovieList = async (userId: number): Promise<MovieListItem[]> => {
	let movies = await repository.getUserMovieList(userId);

	for (let i = 0; i < movies.length; i++) {
		await movies[i].getMovie();
	}

	return movies;
};

export default {
	addMovie,
	getUserMovieList,
};
