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
exports.checkIfPlaceNotExist = exports.checkIfPlaceExists = void 0;
const serverErrorsHandler_1 = require("./serverErrorsHandler");
const prismaInstance_1 = require("../db/prismaInstance");
const formatCords_1 = require("../helpers/formatCords");
const errorJson_1 = require("../helpers/errorJson");
const checkIfPlaceExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.authUser == null)
        return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
    const { id } = req.authUser;
    const { cords } = req.body;
    try {
        const formattedCords = (0, formatCords_1.formatCords)(cords.lat, cords.lng);
        const findPlace = yield prismaInstance_1.prisma.place.findFirst({
            include: {
                waypoint: { select: { cords: true } }
            },
            where: {
                user_id: id, waypoint: { cords: formattedCords }
            }
        });
        if (findPlace == null)
            return next();
        return res.status(400).json((0, errorJson_1.errorJson)('Place is already registered'));
    }
    catch (error) {
        (0, serverErrorsHandler_1.serverErrorsHandler)(error, req, res);
    }
});
exports.checkIfPlaceExists = checkIfPlaceExists;
const checkIfPlaceNotExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.authUser == null)
        return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
    const { id } = req.authUser;
    const { placeId } = req.params;
    try {
        const searchPlace = yield prismaInstance_1.prisma.place.findFirst({ where: { id: +placeId, user_id: id } });
        if (searchPlace == null)
            return res.status(404).json((0, errorJson_1.errorJson)('Place not found'));
        return next();
    }
    catch (error) {
        (0, serverErrorsHandler_1.serverErrorsHandler)(error, req, res);
    }
});
exports.checkIfPlaceNotExist = checkIfPlaceNotExist;
