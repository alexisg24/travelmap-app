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
exports.checkIfWaypointNotExist = void 0;
const prismaInstance_1 = require("../db/prismaInstance");
const serverErrorsHandler_1 = require("./serverErrorsHandler");
const errorJson_1 = require("../helpers/errorJson");
const checkIfWaypointNotExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.authUser == null)
        return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
    const { id } = req.authUser;
    const { waypointId } = req.params;
    try {
        const searchWaypoint = yield prismaInstance_1.prisma.waypoint.findFirst({ where: { id: +waypointId, user_id: id } });
        if (searchWaypoint == null)
            return res.status(404).json((0, errorJson_1.errorJson)('Waypoint not found'));
        return next();
    }
    catch (error) {
        (0, serverErrorsHandler_1.serverErrorsHandler)(error, req, res);
    }
});
exports.checkIfWaypointNotExist = checkIfWaypointNotExist;
