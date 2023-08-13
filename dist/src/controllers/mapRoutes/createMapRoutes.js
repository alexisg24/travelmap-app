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
exports.createMapRoutes = void 0;
const middlewares_1 = require("../../middlewares");
const utils_1 = require("../../utils");
const prismaInstance_1 = require("../../db/prismaInstance");
const errorJson_1 = require("../../helpers/errorJson");
const createMapRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.authUser == null)
        return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
    const { id } = req.authUser;
    const { title, cords1, cords2 } = req.body;
    try {
        const [cords1Item, cord2Item] = yield Promise.all([
            (0, utils_1.createWaypointFn)(id, cords1.lat, cords1.lng),
            (0, utils_1.createWaypointFn)(id, cords2.lat, cords2.lng)
        ]);
        const mapRoute = yield prismaInstance_1.prisma.route.create({
            select: {
                id: true,
                title: true,
                waypoint1: { select: { cords: true } },
                waypoint2: { select: { cords: true } }
            },
            data: {
                user_id: id,
                title,
                waypoint1_id: cords1Item.id,
                waypoint2_id: cord2Item.id
            }
        });
        return res.status(201).json({ ok: true, route: mapRoute });
    }
    catch (error) {
        return (0, middlewares_1.serverErrorsHandler)(error, req, res);
    }
});
exports.createMapRoutes = createMapRoutes;
