import User from './User';
import movieDbAPI from '../providers/MovieDb';
import Movie from './Movie';

class MovieListItem {
	id: number;
	user: User;
	movieId: number;
	movie?: Movie;

	constructor(id: number, user: User, movieId: number) {
		this.id = id;
		this.user = user;
		this.movieId = movieId;
	}

	public async getMovie() {
		try {
			this.movie = await movieDbAPI.getMovieById(this.movieId);
		} catch (error: any) {
			console.error('failed to get movie', error);
		}
	}
}

export default MovieListItem;
