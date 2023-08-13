"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesResponse = exports.GetPlacesResponse = void 0;
exports.GetPlacesResponse = {
    type: 'object',
    required: ['ok', 'results'],
    properties: {
        ok: { type: 'boolean', example: true },
        results: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 0 },
                    title: { type: 'string', example: 'Title 1' },
                    comment: { type: 'string', example: 'This is a comment' },
                    waypoint: {
                        type: 'object',
                        properties: {
                            cords: { type: 'string', example: '(lat, lng)' }
                        }
                    }
                }
            }
        },
        previous: {
            type: 'object',
            properties: {
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 }
            }
        },
        next: {
            type: 'object',
            properties: {
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 }
            }
        },
        maxPages: { type: 'number', example: 100 }
    }
};
exports.PlacesResponse = {
    type: 'object',
    required: ['ok', 'place'],
    properties: {
        ok: { type: 'boolean', example: true },
        place: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 0 },
                title: { type: 'string', example: 'Title 1' },
                comment: { type: 'string', example: 'This is a comment' },
                waypoint: {
                    type: 'object',
                    properties: {
                        cords: { type: 'string', example: '(lat, lng)' }
                    }
                }
            }
        }
    }
};
