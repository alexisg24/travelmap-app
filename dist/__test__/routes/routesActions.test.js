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
describe('Post, put and delete in /maproutes', () => {
    test('test should create, edit and delete a route', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(src_1.default).post(`${BASE_URL}/users/login`).send({ email: 'test@mail.com', password: '123456' });
        const { accessToken } = JSON.parse(login.text);
        const token = accessToken;
        const response1 = yield (0, supertest_1.default)(src_1.default)
            .post(`${BASE_URL}/maproutes`)
            .set('x-access-token', token)
            .send({ title: 'Example', cords1: { lat: 150, lng: 150 }, cords2: { lat: 180, lng: 190 } });
        expect(response1.status).toBe(201);
        expect(JSON.parse(response1.text)).toMatchObject({
            ok: true,
            route: expect.objectContaining({
                id: expect.any(Number),
                waypoint1: expect.objectContaining({ cords: expect.any(String) }),
                waypoint2: expect.objectContaining({ cords: expect.any(String) })
            })
        });
        const { route } = JSON.parse(response1.text);
        const response2 = yield (0, supertest_1.default)(src_1.default)
            .put(`${BASE_URL}/maproutes/${route.id}`)
            .set('x-access-token', token)
            .send({ title: 'Example2', cords1: { lat: 170, lng: 170 }, cords2: { lat: 180, lng: 190 } });
        expect(response2.status).toBe(201);
        expect(JSON.parse(response2.text)).toMatchObject({
            ok: true,
            route: expect.objectContaining({
                id: expect.any(Number),
                waypoint1: expect.objectContaining({ cords: expect.any(String) }),
                waypoint2: expect.objectContaining({ cords: expect.any(String) })
            })
        });
        const response3 = yield (0, supertest_1.default)(src_1.default)
            .delete(`${BASE_URL}/maproutes/${route.id}`)
            .set('x-access-token', token);
        expect(response3.status).toBe(201);
        expect(JSON.parse(response3.text)).toMatchObject({
            ok: true,
            route: expect.objectContaining({
                id: expect.any(Number),
                waypoint1: expect.objectContaining({ cords: expect.any(String) }),
                waypoint2: expect.objectContaining({ cords: expect.any(String) })
            })
        });
    }));
});
