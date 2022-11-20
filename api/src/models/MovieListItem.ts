import User from './User';
import movieDbAPI from '../providers/MovieDb';
import Movie from './Movie';

class MovieListItem {
	id: number;
	userId: number;
	movieId?: number;
	movie?: Movie;

	constructor(id: number, user: number, movieId: number) {
		this.id = id;
		this.userId = user;
		this.movieId = movieId;
	}

	public async getMovie() {
		try {
			this.movie = await movieDbAPI.getMovieById(Number(this.movieId));
			delete this.movieId;
		} catch (error: any) {
			console.error('failed to get movie', error);
		}
	}
}

export default MovieListItem;
