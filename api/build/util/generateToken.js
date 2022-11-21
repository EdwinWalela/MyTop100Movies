"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const generate = (user) => {
    let payload = {
        id: user.id,
    };
    let token = jsonwebtoken_1.default.sign({ user: payload }, config_1.default.jwt.secret, {
        expiresIn: `${config_1.default.jwt.expiry}d`,
    });
    return token;
};
exports.default = generate;
