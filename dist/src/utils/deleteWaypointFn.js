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
exports.deleteWaypointFn = void 0;
const prismaInstance_1 = require("../db/prismaInstance");
const deleteWaypointFn = (userID, waypointId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteWaypoint = yield prismaInstance_1.prisma.waypoint.delete({
            where: {
                user_id: userID,
                id: +waypointId
            }
        });
        return deleteWaypoint;
    }
    catch (error) {
        console.log(error);
        throw new Error('Error deleting waypoint');
    }
});
exports.deleteWaypointFn = deleteWaypointFn;
