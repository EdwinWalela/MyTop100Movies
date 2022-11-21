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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const process_1 = require("process");
const db_1 = __importDefault(require("./config/db"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const auth_1 = __importDefault(require("./routes/auth"));
const movies_1 = __importDefault(require("./routes/movies"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/movies', movies_1.default);
// Swagger documentation
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '..', 'docs/', 'api.yaml'));
app.use('/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.connect();
        console.log('Connected to database');
    }
    catch (error) {
        console.log('failed to connect to database', error);
        (0, process_1.exit)(1);
    }
}))();
app.listen(config_1.default.httpPort, () => {
    console.log(`Listening for requests on port ${config_1.default.httpPort}`);
});
