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
const db_handler_1 = __importDefault(require("./db-handler"));
/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield db_handler_1.default.connect(); }));
/**
 * Clear all test data after every test.
 */
afterEach(() => __awaiter(void 0, void 0, void 0, function* () { return yield db_handler_1.default.clearDatabase(); }));
/**
 * Remove and close the db and server.
 */
afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return yield db_handler_1.default.closeDatabase(); }));
//# sourceMappingURL=setup.js.map