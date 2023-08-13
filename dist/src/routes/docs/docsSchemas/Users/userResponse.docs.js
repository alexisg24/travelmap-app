"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = void 0;
exports.LoginResponse = {
    type: 'object',
    required: ['ok', 'accessToken'],
    properties: {
        ok: { type: 'boolean', example: true },
        accessToken: { type: 'string', example: '<KEY>' }
    }
};
