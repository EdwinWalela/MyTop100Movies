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
const User_1 = __importDefault(require("../models/User"));
const createUserQuery = `INSERT INTO "User"(email, password) VALUES ($1, $2) RETURNING id;`;
const getUserByEmailQuery = `SELECT * FROM "User" WHERE email = $1;`;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let res;
    try {
        res = yield db_1.default.query(createUserQuery, [user.email, user.password]);
    }
    catch (error) {
        console.error('Failed to register user', error);
        throw new Error(error.message);
    }
    return (_a = res.rows[0]) === null || _a === void 0 ? void 0 : _a.id;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    let res;
    try {
        res = yield db_1.default.query(getUserByEmailQuery, [email]);
    }
    catch (error) {
        console.error('Failed to get user by email', error);
        throw new Error(error.message);
    }
    if (res.rowCount === 0)
        throw new Error('User not found');
    return new User_1.default((_b = res.rows[0]) === null || _b === void 0 ? void 0 : _b.email, (_c = res.rows[0]) === null || _c === void 0 ? void 0 : _c.password, (_d = res.rows[0]) === null || _d === void 0 ? void 0 : _d.id);
});
exports.default = { createUser, getUserByEmail };
