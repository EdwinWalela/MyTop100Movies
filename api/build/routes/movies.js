"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_1 = __importDefault(require("../controllers/movies"));
const tokenVerification_1 = __importDefault(require("../middleware/tokenVerification"));
const router = express_1.default.Router();
router.get('/', tokenVerification_1.default, movies_1.default.getMovieList);
router.get('/search', tokenVerification_1.default, movies_1.default.searchMovie);
router.post('/', tokenVerification_1.default, movies_1.default.addMovie);
router.get('/:id', tokenVerification_1.default, movies_1.default.getUserMovieList);
exports.default = router;
