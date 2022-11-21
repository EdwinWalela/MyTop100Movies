"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const HTTP_PORT = Number(process.env.PORT) || 3000;
const PG_USER = process.env.PG_USER;
const PG_DB = process.env.PG_DB;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = Number(process.env.PG_PORT);
const PG_PASS = process.env.PG_PASSWORD;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRY = Number(process.env.JWT_EXPIRY) || 30;
const MovieDBAPIBaseURL = process.env.MovieDBAPIBaseURL || '';
const MovieDBAPIKey = process.env.MovieDBAPIKey || '';
const config = {
    httpPort: HTTP_PORT,
    db: {
        user: PG_USER,
        pass: PG_PASS,
        port: PG_PORT,
        db: PG_DB,
        host: PG_HOST,
    },
    jwt: {
        secret: JWT_SECRET,
        expiry: JWT_EXPIRY,
    },
    saltRounds: SALT_ROUNDS,
    movieDB: {
        baseUrl: MovieDBAPIBaseURL,
        apiKey: MovieDBAPIKey,
    },
};
exports.default = config;
