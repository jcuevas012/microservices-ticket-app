"use strict";
// tests/db-handler.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod;
/**
 * Connect to the in-memory database.
 */
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    mongod = yield MongoMemoryServer.create();
    const uri = yield mongod.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
    };
    yield mongoose.connect(uri, mongooseOpts);
});
/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.dropDatabase();
    yield mongoose.connection.close();
    yield mongod.stop();
});
/**
 * Remove all the data for all db collections.
 */
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        yield collection.deleteMany();
    }
});
exports.default = { connect, closeDatabase, clearDatabase };
//# sourceMappingURL=db-handler.js.map