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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlace = void 0;
const middlewares_1 = require("../../middlewares");
const prismaInstance_1 = require("../../db/prismaInstance");
const utils_1 = require("../../utils");
const errorJson_1 = require("../../helpers/errorJson");
const deletePlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.authUser == null)
        return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
    const { id } = req.authUser;
    const { placeId } = req.params;
    try {
        const _a = yield prismaInstance_1.prisma.place.delete({
            select: {
                id: true,
                title: true,
                comment: true,
                waypoint_id: true,
                waypoint: {
                    select: {
                        cords: true
                    }
                }
            },
            where: { id: +placeId }
        }), { waypoint_id: waypointID } = _a, deletedPlace = __rest(_a, ["waypoint_id"]);
        yield (0, utils_1.deleteWaypointFn)(id, waypointID);
        return res.status(201).json({ ok: true, place: deletedPlace });
    }
    catch (error) {
        return (0, middlewares_1.serverErrorsHandler)(error, req, res);
    }
});
exports.deletePlace = deletePlace;
