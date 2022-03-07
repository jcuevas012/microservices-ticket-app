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
describe(' POST /users/signin test cases', function () {
    const agent = supertest_1.default.agent(app_1.app);
    it('signin 400 bad request ', () => __awaiter(this, void 0, void 0, function* () {
        yield agent
            .post('/api/users/signup')
            .send({
            email: 'test@gmail.com',
            password: 'test1323',
        })
            .expect(201);
        return agent
            .post('/api/users/signin')
            .send({
            email: 'test@gmail.com',
            password: '',
        })
            .expect(400);
    }));
    it('signin 200 ', () => __awaiter(this, void 0, void 0, function* () {
        yield agent
            .post('/api/users/signup')
            .send({
            email: 'test@gmail.com',
            password: 'test1323',
        })
            .expect(201);
        return agent
            .post('/api/users/signin')
            .send({
            email: 'test@gmail.com',
            password: 'test1323',
        })
            .expect(200);
    }));
});
//# sourceMappingURL=signin.test.js.map