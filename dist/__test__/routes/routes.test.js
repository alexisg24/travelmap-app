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
const BASE_URL = '/api/v1';
describe('Tests in /maproutes', () => {
    test('request should fail when user sent wrong body or headers', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(src_1.default).get(`${BASE_URL}/maproutes`);
        expect(response.status).toBe(401);
        expect(JSON.parse(response.text)).toMatchObject({
            ok: false,
            message: expect.arrayContaining([
                expect.objectContaining({ error: expect.any(String) })
            ])
        });
    }));
    test('should return all maproutes', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(src_1.default).post(`${BASE_URL}/users/login`).send({ email: 'test2@mail.com', password: '123456' });
        const { accessToken } = JSON.parse(login.text);
        const token = accessToken;
        const response = yield (0, supertest_1.default)(src_1.default).get(`${BASE_URL}/maproutes?page=2&limit=1`).set('x-access-token', token);
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text)).toMatchObject({
            ok: true,
            results: expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    waypoint1: expect.objectContaining({ cords: expect.any(String) }),
                    waypoint2: expect.objectContaining({ cords: expect.any(String) })
                })
            ]),
            previous: expect.objectContaining({
                page: expect.any(Number),
                limit: expect.any(Number)
            }),
            next: expect.objectContaining({
                page: expect.any(Number),
                limit: expect.any(Number)
            }),
            maxPages: expect.any(Number)
        });
    }));
});
