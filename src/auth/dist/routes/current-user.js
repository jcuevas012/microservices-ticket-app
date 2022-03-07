"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserRouter = void 0;
const express_1 = require("express");
const utils_1 = require("@ticket-app/utils");
// import currentUser from '../middlewares/current-user'
// import requireAuth from '../middlewares/require-auth'
const router = express_1.Router();
exports.currentUserRouter = router;
router.get('/current-user', utils_1.currentUser, utils_1.requireAuth, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});
//# sourceMappingURL=current-user.js.map