"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationUser = exports.User = void 0;
exports.User = {
    type: 'object',
    required: ['name', 'lastname', 'email', 'password'],
    properties: {
        name: {
            type: 'string'
        },
        lastname: {
            type: 'string'
        },
        username: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    }
};
exports.AuthenticationUser = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    }
};
