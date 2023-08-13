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
exports.checkIfRouteNotExists = exports.checkIfRouteExists = void 0;
const formatCords_1 = require("../helpers/formatCords");
const prismaInstance_1 = require("../db/prismaInstance");
const serverErrorsHandler_1 = require("./serverErrorsHandler");
const errorJson_1 = require("../helpers/errorJson");
const checkIfRouteExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.authUser == null)
        return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
    const { id } = req.authUser;
    const { cords1, cords2 } = req.body;
    try {
        const [formattedCords1, formattedCords2] = [(0, formatCords_1.formatCords)(cords1.lat, cords1.lng), (0, formatCords_1.formatCords)(cords2.lat, cords2.lng)];
        const findRoute = yield prismaInstance_1.prisma.route.findFirst({
            include: {
                waypoint1: {
                    select: {
                        id: true,
                        cords: true
                    }
                },
                waypoint2: {
                    select: {
                        id: true,
                        cords: true
                    }
                }
            },
            where: {
                user_id: {
                    equals: id
                },
                waypoint1: {
                    cords: formattedCords1
                },
                waypoint2: {
                    cords: formattedCords2
                }
            }
        });
        if (findRoute == null)
            return next();
        return res.status(400).json((0, errorJson_1.errorJson)('Route is already registered'));
    }
    catch (error) {
        (0, serverErrorsHandler_1.serverErrorsHandler)(error, req, res);
    }
});
exports.checkIfRouteExists = checkIfRouteExists;
const checkIfRouteNotExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.authUser == null)
        return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
    const { id } = req.authUser;
    const { mapRouteID } = req.params;
    try {
        const findRoute = yield prismaInstance_1.prisma.route.findFirst({ where: { user_id: id, id: +mapRouteID } });
        if (findRoute == null)
            return res.status(404).json((0, errorJson_1.errorJson)('Route not found'));
        return next();
    }
    catch (error) {
        (0, serverErrorsHandler_1.serverErrorsHandler)(error, req, res);
    }
});
exports.checkIfRouteNotExists = checkIfRouteNotExists;
