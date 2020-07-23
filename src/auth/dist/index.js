"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 3000;
app.use(body_parser_1.json());
app.get("/api/users/currentuser", (req, res) => {
    res.send("I' am current user");
});
app.listen(PORT, (req, res) => {
    console.log(`Auth service listening in port ${PORT}`);
});
//# sourceMappingURL=index.js.map