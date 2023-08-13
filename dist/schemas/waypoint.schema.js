"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsWaypointSchema = exports.waypointSchema = void 0;
const zod_1 = require("zod");
exports.waypointSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        lat: (0, zod_1.number)({
            required_error: 'Latitude is required',
            invalid_type_error: 'Latitude must be a number'
        }).safe(),
        lng: (0, zod_1.number)({
            required_error: 'Longitude is required',
            invalid_type_error: 'Longitude must be a number'
        }).safe()
    })
});
exports.paramsWaypointSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        waypointId: (0, zod_1.string)({
            required_error: 'WaypointId is required',
            invalid_type_error: 'WaypointId must be a valid id'
        }).regex(/^[1-9]\d*$/, { message: 'WaypointId must be a valid integer number' })
    })
});
