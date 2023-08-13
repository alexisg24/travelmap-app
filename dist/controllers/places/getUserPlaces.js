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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPlaces = void 0;
const middlewares_1 = require("../../middlewares");
const prismaInstance_1 = require("../../db/prismaInstance");
const paginateInfo_1 = require("../../helpers/paginateInfo");
const errorJson_1 = require("../../helpers/errorJson");
const getUserPlaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.authUser == null)
        return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
    const { id } = req.authUser;
    try {
        if (res.paginatedValues == null)
            throw new Error('Paginated values not found');
        const { page, limit, startIndex } = res.paginatedValues;
        const getPlacesQuery = prismaInstance_1.prisma.place.findMany({
            skip: startIndex,
            take: limit,
            select: {
                id: true,
                title: true,
                comment: true,
                waypoint: { select: { cords: true } }
            },
            where: { user_id: id },
            orderBy: {
                title: 'desc'
            }
        });
        const [userPlaces, countAllPlaces] = yield prismaInstance_1.prisma.$transaction([
            getPlacesQuery,
            prismaInstance_1.prisma.place.count({ where: { user_id: id } })
        ]);
        const maxPages = Math.floor(countAllPlaces / limit);
        const pagination = (0, paginateInfo_1.paginateInfo)({
            resultArrayLength: userPlaces.length,
            startIndex,
            page,
            limit,
            maxPages
        });
        const results = Object.assign(Object.assign({ results: userPlaces }, pagination), { maxPages });
        return res.status(200).json(Object.assign({ ok: true }, results));
    }
    catch (error) {
        return (0, middlewares_1.serverErrorsHandler)(error, req, res);
    }
});
exports.getUserPlaces = getUserPlaces;
