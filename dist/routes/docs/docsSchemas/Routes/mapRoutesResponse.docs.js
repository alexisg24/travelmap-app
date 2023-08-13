"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoutesResponse = exports.MapRouteResponse = void 0;
const route = {
    id: { type: 'integer', example: 1 },
    title: { type: 'string', example: 'Route 1' },
    waypoint1: {
        type: 'object',
        required: ['cords'],
        properties: { cords: { type: 'string', example: '(lat, lng)' } }
    },
    waypoint2: {
        type: 'object',
        required: ['cords'],
        properties: { cords: { type: 'string', example: '(lat, lng)' } }
    }
};
exports.MapRouteResponse = {
    type: 'object',
    required: ['ok', 'route'],
    properties: {
        ok: { type: 'boolean', example: true },
        route: {
            type: 'object',
            required: ['id', 'title', 'waypoint1', 'waypoint2'],
            properties: route
        }
    }
};
exports.GetRoutesResponse = {
    type: 'object',
    required: ['ok', 'results'],
    properties: {
        ok: { type: 'boolean', example: true },
        results: {
            type: 'array',
            items: {
                type: 'object',
                properties: route
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
