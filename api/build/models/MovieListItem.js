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
const MovieDb_1 = __importDefault(require("../providers/MovieDb"));
class MovieListItem {
    constructor(id, user, movieId) {
        this.id = id;
        this.userId = user;
        this.movieId = movieId;
    }
    getMovie() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.movie = yield MovieDb_1.default.getMovieById(Number(this.movieId));
                delete this.movieId;
            }
            catch (error) {
                console.error('failed to get movie', error);
            }
        });
    }
}
exports.default = MovieListItem;
