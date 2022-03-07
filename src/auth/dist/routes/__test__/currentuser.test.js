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
exports.signup = void 0;
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
exports.signup = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = supertest_1.default.agent(app_1.app);
    const response = yield agent
        .post('/api/users/signup')
        .send({
        email, password
    });
    return response.get('Set-Cookie');
});
describe(' POST /users/current-user test cases', function () {
    const agent = supertest_1.default.agent(app_1.app);
    it('current user value ', () => __awaiter(this, void 0, void 0, function* () {
        const email = 'test@gmail.com';
        const password = 'test1323';
        const cookies = yield exports.signup(email, password);
        const response = yield agent
            .get('/api/users/current-user')
            .set('Cookie', cookies)
            .send({});
        expect(response.body.currentUser.email).toEqual(email);
    }));
});
//# sourceMappingURL=currentuser.test.js.map