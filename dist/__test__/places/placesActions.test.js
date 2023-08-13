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
describe('Post, put and delete in /places', () => {
    test('test should create, edit and delete a place', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(src_1.default).post(`${BASE_URL}/users/login`).send({ email: 'test@mail.com', password: '123456' });
        const { accessToken } = JSON.parse(login.text);
        const token = accessToken;
        const response1 = yield (0, supertest_1.default)(src_1.default)
            .post(`${BASE_URL}/places`)
            .set('x-access-token', token)
            .send({ title: 'Example', cords: { lat: 150, lng: 150 } });
        expect(response1.status).toBe(201);
        expect(JSON.parse(response1.text)).toMatchObject({
            ok: true,
            place: expect.objectContaining({ id: expect.any(Number), waypoint: expect.objectContaining({ cords: expect.any(String) }) })
        });
        const { place } = JSON.parse(response1.text);
        const response2 = yield (0, supertest_1.default)(src_1.default)
            .put(`${BASE_URL}/places/${place.id}`)
            .set('x-access-token', token)
            .send({ title: 'Example', cords: { lat: 102, lng: 102 } });
        expect(response2.status).toBe(201);
        expect(JSON.parse(response2.text)).toMatchObject({
            ok: true,
            place: expect.objectContaining({ id: expect.any(Number), waypoint: expect.objectContaining({ cords: expect.any(String) }) })
        });
        const response3 = yield (0, supertest_1.default)(src_1.default)
            .delete(`${BASE_URL}/places/${place.id}`)
            .set('x-access-token', token);
        expect(response3.status).toBe(201);
        expect(JSON.parse(response3.text)).toMatchObject({
            ok: true,
            place: expect.objectContaining({ id: expect.any(Number), waypoint: expect.objectContaining({ cords: expect.any(String) }) })
        });
    }));
});
