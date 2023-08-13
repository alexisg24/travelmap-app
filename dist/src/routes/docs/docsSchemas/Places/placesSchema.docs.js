"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesSchema = void 0;
exports.PlacesSchema = {
    type: 'object',
    required: ['title', 'cords'],
    properties: {
        title: {
            type: 'string'
        },
        comment: {
            type: 'string'
        },
        cords: {
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
