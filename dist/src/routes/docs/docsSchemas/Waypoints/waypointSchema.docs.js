"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaypointSchema = void 0;
exports.WaypointSchema = {
    type: 'object',
    required: ['lat', 'lng'],
    properties: {
        lat: {
            type: 'number'
        },
        lng: {
            type: 'number'
        }
    }
};
