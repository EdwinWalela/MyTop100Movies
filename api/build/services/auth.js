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
const user_1 = __importDefault(require("../repositories/user"));
const generateToken_1 = __importDefault(require("../util/generateToken"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield user.hashPassword();
    return yield user_1.default.createUser(user);
});
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.getUserByEmail(email);
    const isValid = yield user.verifyPassword(password);
    if (!isValid)
        throw new Error('Invalid credentials');
    return (0, generateToken_1.default)(user);
});
exports.default = {
    createUser,
    login,
};
