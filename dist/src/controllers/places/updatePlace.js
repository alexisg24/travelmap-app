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
exports.updatePlace = void 0;
const middlewares_1 = require("../../middlewares");
const prismaInstance_1 = require("../../db/prismaInstance");
const utils_1 = require("../../utils");
const errorJson_1 = require("../../helpers/errorJson");
const updatePlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.authUser == null)
        return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
    const { id } = req.authUser;
    const { placeId } = req.params;
    const { title, comment, cords } = req.body;
    try {
        const updatePlace = yield prismaInstance_1.prisma.place.update({ data: { title, comment }, where: { id: +placeId } });
        yield (0, utils_1.updateWaypointFn)(id, updatePlace.waypoint_id, cords.lat, cords.lng);
        const result = yield prismaInstance_1.prisma.place.findFirst({
            select: {
                id: true,
                title: true,
                comment: true,
                waypoint: {
                    select: {
                        cords: true
                    }
                }
            },
            where: { id: +placeId }
        });
        return res.status(201).json({ ok: true, place: result });
    }
    catch (error) {
        return (0, middlewares_1.serverErrorsHandler)(error, req, res);
    }
});
exports.updatePlace = updatePlace;
