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
const User_1 = __importDefault(require("../models/User"));
const auth_1 = __importDefault(require("../services/auth"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = new User_1.default(email, password);
    let id;
    if (!email || !password) {
        return res.status(400).send({
            message: 'Required fields missing',
        });
    }
    try {
        id = yield auth_1.default.createUser(user);
        return res.status(201).send({
            message: 'User created',
            id: id
        });
    }
    catch (error) {
        return res.status(400).send({
            error: error.message
        });
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            message: 'Required fields missing'
        });
    }
    try {
        const token = yield auth_1.default.login(email, password);
        return res.status(200).send({
            token
        });
    }
    catch (error) {
        return res.status(400).send({
            error: error.message
        });
    }
});
exports.default = {
    registerUser,
    login
};
