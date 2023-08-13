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
const BASE_URL = '/api/v1/users';
describe('Test in /login', () => {
    test('should login successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(src_1.default)
            .post(`${BASE_URL}/login`)
            .send({
            email: 'test@mail.com',
            password: '123456'
        });
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text)).toMatchObject({
            ok: true,
            accessToken: expect.any(String)
        });
    }));
    test('request should fail when recive empty body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(src_1.default).post(`${BASE_URL}/login`);
        expect(response.status).toBe(400);
        expect(JSON.parse(response.text)).toMatchObject({
            ok: false,
            message: expect.arrayContaining([
                expect.objectContaining({
                    error: expect.any(String)
                })
            ])
        });
    }));
    test('should not login with wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
        const [response1, response2] = yield Promise.all([
            (0, supertest_1.default)(src_1.default).post(`${BASE_URL}/login`).send({ email: 'wrong@mail.com', password: '123456' }),
            (0, supertest_1.default)(src_1.default).post(`${BASE_URL}/login`).send({ email: 'test@mail.com', password: '12345678' })
        ]);
        expect(response1.status).toBe(400);
        expect(JSON.parse(response1.text)).toMatchObject({
            ok: false,
            message: expect.arrayContaining([
                expect.objectContaining({
                    error: expect.any(String)
                })
            ])
        });
        expect(response2.status).toBe(400);
        expect(JSON.parse(response2.text)).toMatchObject({
            ok: false,
            message: expect.arrayContaining([
                expect.objectContaining({
                    error: expect.any(String)
                })
            ])
        });
    }));
});
