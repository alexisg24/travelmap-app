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
exports.createPlace = void 0;
const middlewares_1 = require("../../middlewares");
const prismaInstance_1 = require("../../db/prismaInstance");
const createWaypointFn_1 = require("../../utils/createWaypointFn");
const errorJson_1 = require("../../helpers/errorJson");
const createPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.authUser == null)
        return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
    const { id } = req.authUser;
    const { title, comment, cords } = req.body;
    try {
        const createWaypoint = yield (0, createWaypointFn_1.createWaypointFn)(id, cords.lat, cords.lng);
        const newPlace = yield prismaInstance_1.prisma.place.create({
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
            data: {
                title,
                comment: comment !== null && comment !== void 0 ? comment : '',
                waypoint_id: createWaypoint.id,
                user_id: id
            }
        });
        return res.status(201).json({ ok: true, place: newPlace });
    }
    catch (error) {
        return (0, middlewares_1.serverErrorsHandler)(error, req, res);
    }
});
exports.createPlace = createPlace;
