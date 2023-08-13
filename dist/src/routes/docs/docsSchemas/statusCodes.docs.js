"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorSchema = void 0;
exports.ErrorSchema = {
    description: 'FAILED',
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/ErrorSchema'
            }
        }
    }
};
