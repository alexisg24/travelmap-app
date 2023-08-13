"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapRouteSchema = void 0;
exports.MapRouteSchema = {
    type: 'object',
    required: ['title', 'cords1', 'cords2'],
    properties: {
        title: {
            type: 'string'
        },
        cords1: {
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
        },
        cords2: {
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
        }
    }
};
