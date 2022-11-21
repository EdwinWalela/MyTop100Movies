"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const NAMESPACE = 'TokenVerification';
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        if (bearer.length !== 2) {
            res.status(403).send({
                error: 'Bearer token is malformed',
            });
            return;
        }
        const bearerToken = bearer[1];
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(bearerToken, config_1.default.jwt.secret);
        }
        catch (error) {
            res.status(403).send({
                error: error.message,
            });
            return;
        }
        req.userId = decoded.user.id;
        next();
    }
    else {
        res.status(403).send({
            error: 'Bearer token is required',
        });
        return;
    }
};
exports.default = verifyToken;
