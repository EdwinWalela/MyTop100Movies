"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_pool_1 = __importDefault(require("pg-pool"));
const config_1 = __importDefault(require("./config"));
const pool = new pg_pool_1.default({
    database: config_1.default.db.db,
    user: config_1.default.db.user,
    password: config_1.default.db.pass,
    port: config_1.default.db.port,
    host: config_1.default.db.host,
});
exports.default = pool;
