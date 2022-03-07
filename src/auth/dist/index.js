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
require("express-async-errors");
const body_parser_1 = require("body-parser");
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("@ticket-app/utils");
const routes_1 = require("./routes");
const app = express_1.default();
const PORT = 3000;
app.set('trust proxy', 1); // trust first proxy
app.use(body_parser_1.json());
app.use(cookie_session_1.default({
    signed: false,
    secure: true,
}));
app.use('/api/users', routes_1.currentUserRouter);
app.use('/api/users', routes_1.signInRouter);
app.use('/api/users', routes_1.signUpRouter);
app.use('/api/users', routes_1.signOutRouter);
app.all('*', () => {
    throw new utils_1.NotFoundError();
});
app.use(utils_1.errorHandler);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined.');
    }
    try {
        yield mongoose_1.default.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Connected to mongodb');
    }
    catch (err) {
        console.error(err);
    }
    app.listen(PORT, () => {
        console.log(`Auth service listening in port ${PORT}`);
    });
});
start();
//# sourceMappingURL=index.js.map