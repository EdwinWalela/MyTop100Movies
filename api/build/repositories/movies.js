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
const db_1 = __importDefault(require("../config/db"));
const MovieListItem_1 = __importDefault(require("../models/MovieListItem"));
const addMovieQuery = `INSERT into "MovieList" (id,"userId") VALUES ($1,$2)`;
const getUserMoviesQuery = `SELECT * FROM "MovieList" WHERE "userId" = $1`;
const addMovie = (movieId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let res;
    try {
        res = yield db_1.default.query(addMovieQuery, [movieId, userId]);
    }
    catch (error) {
        console.error('failed to save user movie', error);
        throw new Error(error.message);
    }
});
const getUserMovieList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let res;
    let movieList = [];
    try {
        res = yield db_1.default.query(getUserMoviesQuery, [userId]);
    }
    catch (error) {
        console.error('failed to get user movie list', error);
        throw new Error(error.message);
    }
    for (const item of res.rows) {
        let movieItem = new MovieListItem_1.default(item.id, item.userId, item.id);
        movieList.push(movieItem);
    }
    return movieList;
});
exports.default = {
    getUserMovieList,
    addMovie,
};
