"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const Movie_1 = __importDefault(require("../models/Movie"));
const axios_1 = __importDefault(require("axios"));
class MovieDb {
    constructor() {
        this.apiKey = config_1.default.movieDB.apiKey;
        this.baseUrl = config_1.default.movieDB.baseUrl;
    }
    getMovieList(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            try {
                res = yield axios_1.default.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&page=${page}`);
            }
            catch (error) {
                console.error('Failed to get movie list', error);
                throw new Error(error.message);
            }
            return this.responseSerializer(res.data);
        });
    }
    movieSearch(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            try {
                res = yield axios_1.default.get(`${this.baseUrl}/search/movie?query=${query}&api_key=${this.apiKey}`);
            }
            catch (error) {
                console.error('Failed to search for movies ', error);
                throw new Error(error.message);
            }
            return this.responseSerializer(res.data);
        });
    }
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            try {
                res = yield axios_1.default.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
            }
            catch (error) {
                console.error('Failed to get movie list', error);
                throw new Error(error.message);
            }
            return new Movie_1.default(res.data.id, res.data.original_title, res.data.release_date);
        });
    }
    responseSerializer(response) {
        let movies = [];
        for (const item of response.results) {
            let movie = new Movie_1.default(item.id, item.title, item.release_date);
            movies.push(movie);
        }
        return movies;
    }
}
const movieDbAPI = new MovieDb();
exports.default = movieDbAPI;
