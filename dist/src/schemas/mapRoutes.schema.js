"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramRoutesSchema = exports.mapRouteSchema = void 0;
const zod_1 = require("zod");
exports.mapRouteSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: 'Title is required'
        })
            .nonempty()
            .trim()
            .toUpperCase()
            .min(3, { message: 'Must be 3 or more characters long' })
            .max(50, { message: 'Must be 50 or fewer characters long' })
            .regex(/^[a-zA-Z0-9 ]+$/, { message: 'Must only contain letters and numbers' }),
        cords1: (0, zod_1.object)({
            lat: (0, zod_1.number)({
                required_error: 'Latitude is required',
                invalid_type_error: 'Latitude must be a number'
            }).safe(),
            lng: (0, zod_1.number)({
                required_error: 'Longitude is required',
                invalid_type_error: 'Longitude must be a number'
            }).safe()
        }, { required_error: 'Cords1 object is required' }),
        cords2: (0, zod_1.object)({
            lat: (0, zod_1.number)({
                required_error: 'Latitude is required',
                invalid_type_error: 'Latitude must be a number'
            }).safe(),
            lng: (0, zod_1.number)({
                required_error: 'Longitude is required',
                invalid_type_error: 'Longitude must be a number'
            }).safe()
        }, { required_error: 'Cords2 object is required' })
    })
});
exports.paramRoutesSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        mapRouteID: (0, zod_1.string)({
            required_error: 'mapRouteID is required',
            invalid_type_error: 'mapRouteID must be a valid id'
        }).regex(/^[1-9]\d*$/, { message: 'mapRouteID must be a valid integer number' })
    })
});
