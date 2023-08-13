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
exports.createWaypointFn = void 0;
const prismaInstance_1 = require("../db/prismaInstance");
const formatCords_1 = require("../helpers/formatCords");
const createWaypointFn = (userID, lat, lng) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newWaypoint = yield prismaInstance_1.prisma.waypoint.create({
            data: {
                user_id: userID,
                cords: (0, formatCords_1.formatCords)(lat, lng)
            }
        });
        return newWaypoint;
    }
    catch (error) {
        throw new Error('Error while creating waypoint');
    }
});
exports.createWaypointFn = createWaypointFn;
