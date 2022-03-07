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
exports.signUpRouter = void 0;
const express_1 = require("express");
const utils_1 = require("@ticket-app/utils");
const user_1 = __importDefault(require("../models/user"));
const signup_validator_1 = __importDefault(require("../validators/signup-validator"));
const router = express_1.Router();
exports.signUpRouter = router;
router.post('/signup', [...signup_validator_1.default], utils_1.requestValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userFound = yield user_1.default.findOne({ email });
    if (userFound) {
        throw new utils_1.BadRequestError('Email already exist');
    }
    const user = user_1.default.build({
        email,
        password,
    });
    yield user.save();
    // generate jwt
    const jwt = utils_1.generateToken({
        id: user.id,
        email: user.email,
    });
    // set jwt to session
    req.session.jwt = jwt;
    res.status(201).send(user);
}));
//# sourceMappingURL=signup.js.map