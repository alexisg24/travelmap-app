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
const formatCords_1 = require("../../src/helpers/formatCords");
const BASE_URL = '/api/v1';
describe('Tests in /waypoints', () => {
    test('request should fail when user sent wrong body or headers', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(src_1.default).post(`${BASE_URL}/waypoints`);
        expect(response.status).toBe(400);
        expect(JSON.parse(response.text)).toMatchObject({
            ok: false,
            message: expect.arrayContaining([
                expect.objectContaining({ error: expect.any(String), path: expect.any(String) })
            ])
        });
    }));
    test('should create, edit and delete a waypoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(src_1.default).post(`${BASE_URL}/users/login`).send({ email: 'test@mail.com', password: '123456' });
        const { accessToken } = JSON.parse(login.text);
        const token = accessToken;
        const response1 = yield (0, supertest_1.default)(src_1.default)
            .post(`${BASE_URL}/waypoints`)
            .set('x-access-token', token)
            .send({ lat: 100, lng: 100 });
        expect(response1.status).toBe(201);
        expect(JSON.parse(response1.text)).toMatchObject({
            ok: true,
            waypoint: expect.objectContaining({
                id: expect.any(Number),
                user_id: expect.any(Number),
                cords: expect.any(String)
            })
        });
        const waypoint = (JSON.parse(response1.text).waypoint);
        const data = { lat: 102, lng: 102 };
        const parsedCords = (0, formatCords_1.formatCords)(`${data.lat}`, `${data.lng}`);
        const response2 = yield (0, supertest_1.default)(src_1.default)
            .put(`${BASE_URL}/waypoints/${waypoint.id}`)
            .set('x-access-token', token)
            .send(data);
        expect(response2.status).toBe(201);
        expect(JSON.parse(response2.text)).toMatchObject({
            ok: true,
            waypoint: expect.objectContaining({
                id: expect.any(Number),
                user_id: expect.any(Number),
                cords: parsedCords
            })
        });
        const response3 = yield (0, supertest_1.default)(src_1.default)
            .delete(`${BASE_URL}/waypoints/${waypoint.id}`)
            .set('x-access-token', token);
        expect(response3.status).toBe(201);
        expect(JSON.parse(response3.text)).toMatchObject({
            ok: true,
            waypoint: expect.objectContaining({
                id: expect.any(Number),
                user_id: expect.any(Number),
                cords: expect.any(String)
            })
        });
    }));
});
