"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = [
    express_validator_1.body("email").isEmail().withMessage("Email must be valid"),
    express_validator_1.body("password").trim().notEmpty().withMessage("Password is not valid"),
];
//# sourceMappingURL=signin-validator.js.map