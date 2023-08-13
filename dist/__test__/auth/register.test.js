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
const src_1 = __importDefault(require("../../src"));
const deleteUserFn_1 = require("../../src/utils/deleteUserFn");
const BASE_URL = '/api/v1/users';
describe('Test in /register', () => {
    test('Should register a new user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            name: 'Testing',
            lastname: 'User',
            username: 'testinguser123',
            email: 'thetestinguser123@gmail.com',
            password: '123456'
        };
        const response = yield (0, supertest_1.default)(src_1.default)
            .post(`${BASE_URL}/register`)
            .send(userData);
        expect(response.status).toBe(201);
        expect(JSON.parse(response.text)).toEqual({
            ok: true,
            accessToken: expect.any(String)
        });
        yield (0, deleteUserFn_1.deleteUserFn)(userData.username);
    }));
    test('Should not register a new user with an existing username or email', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            name: 'Testing',
            lastname: 'User',
            username: 'johndoe',
            email: 'test@mail.com',
            password: '123456'
        };
        const response = yield (0, supertest_1.default)(src_1.default)
            .post(`${BASE_URL}/register`)
            .send(userData);
        expect(response.status).toBe(400);
        expect(JSON.parse(response.text)).toEqual({
            ok: false,
            message: expect.arrayContaining([
                expect.objectContaining({
                    error: expect.any(String)
                })
            ])
        });
    }));
    test('Should not register a new user without body info', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(src_1.default)
            .post(`${BASE_URL}/register`);
        expect(response.status).toBe(400);
        expect(JSON.parse(response.text)).toEqual({
            ok: false,
            message: expect.arrayContaining([
                expect.objectContaining({
                    error: expect.any(String),
                    path: expect.any(String)
                })
            ])
        });
    }));
});
