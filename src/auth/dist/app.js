"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("express-async-errors");
const body_parser_1 = require("body-parser");
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("@ticket-app/utils");
const routes_1 = require("./routes");
const app = express_1.default();
exports.app = app;
app.set('trust proxy', 1); // trust first proxy
app.use(body_parser_1.json());
app.use(cookie_session_1.default({
    signed: false,
    secure: process.env.NODE_ENV != 'test',
}));
app.use('/api/users', routes_1.currentUserRouter);
app.use('/api/users', routes_1.signInRouter);
app.use('/api/users', routes_1.signUpRouter);
app.use('/api/users', routes_1.signOutRouter);
app.all('*', () => {
    throw new utils_1.NotFoundError();
});
app.use(utils_1.errorHandler);
//# sourceMappingURL=app.js.map