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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
describe(' POST /users/signup test cases', function () {
    const agent = supertest_1.default.agent(app_1.app);
    it('created 201 ', () => {
        return agent
            .post('/api/users/signup')
            .send({
            email: 'test@gmail.com',
            password: 'test1323',
        })
            .expect(201);
    });
    it('401 invalid email and password invalid request', () => __awaiter(this, void 0, void 0, function* () {
        yield agent
            .post('/api/users/signup')
            .send({
            email: 'test@gmail.com',
        })
            .expect(400);
        yield agent
            .post('/api/users/signup')
            .send({
            password: 'test@gmail.com',
        })
            .expect(400);
    }));
    it('disallow duplicate users expect 400', () => __awaiter(this, void 0, void 0, function* () {
        yield agent
            .post('/api/users/signup')
            .send({
            email: 'test@gmail.com',
            password: 'test1323',
        })
            .expect(201);
        yield agent
            .post('/api/users/signup')
            .send({
            email: 'test@gmail.com',
            password: 'test1323',
        })
            .expect(400);
    }));
    it('sign up has header cookie', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield agent
            .post('/api/users/signup')
            .send({
            email: 'test@gmail.com',
            password: 'test1323',
        })
            .expect(201);
        expect(response.get('Set-Cookie')).toBeDefined();
    }));
});
//# sourceMappingURL=signup.test.js.map