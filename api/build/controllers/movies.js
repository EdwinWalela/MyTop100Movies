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
const movies_1 = __importDefault(require("../services/movies"));
const MovieDb_1 = __importDefault(require("../providers/MovieDb"));
const getMovieList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let movies = [];
    let page = req.query.page ? Number(req.query.page) : 1;
    try {
        movies = yield MovieDb_1.default.getMovieList(page);
    }
    catch (error) {
        return res.status(400).send({
            error: error.message,
        });
    }
    return res.send({
        movies,
    });
});
const searchMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let movies = [];
    let query = req.query.query ? String(req.query.query) : '';
    if (!query || query === '') {
        return res.status(400).send({
            error: 'Query is required',
        });
    }
    try {
        movies = yield MovieDb_1.default.movieSearch(query);
    }
    catch (error) {
        return res.status(400).send({
            error: error.message,
        });
    }
    return res.send({
        movies,
    });
});
const addMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let movieId = req.body.movieId;
    let userId = req.userId;
    console.log(userId);
    if (!movieId) {
        return res.status(400).send({
            error: 'Movie id is required',
        });
    }
    try {
        yield movies_1.default.addMovie(movieId, userId);
    }
    catch (error) {
        return res.status(400).send({
            error: error.message,
        });
    }
    return res.status(201).send({
        message: 'Movie added to list',
    });
});
const getUserMovieList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.userId;
    let movies = [];
    try {
        movies = yield movies_1.default.getUserMovieList(userId);
    }
    catch (error) {
        return res.status(400).send({
            error: error.message,
        });
    }
    return res.send({
        movies,
    });
});
exports.default = { searchMovie, getMovieList, addMovie, getUserMovieList };
