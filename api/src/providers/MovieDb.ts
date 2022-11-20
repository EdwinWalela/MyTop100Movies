import config from '../config/config';
import Movie from '../models/Movie';
import axios from 'axios';

class MovieDb {
	private apiKey: string;
	private baseUrl: string;

	constructor() {
		this.apiKey = config.movieDB.apiKey;
		this.baseUrl = config.movieDB.baseUrl;
	}

	public async getMovieList(): Promise<Movie[]> {
		let res;
		try {
			res = await axios.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`);
		} catch (error: any) {
			console.error('Failed to get movie list', error);
			throw new Error(error.message);
		}
		return this.responseSerializer(res.data);
	}

	private responseSerializer(response: any): Movie[] {
		let movies: Movie[] = [];

		for (const item of response.data.results) {
			let movie = new Movie(item.id, item.title, item.release_date);
			movies.push(movie);
		}

		return movies;
	}
}

const movieDbAPI = new MovieDb();

export default movieDbAPI;
