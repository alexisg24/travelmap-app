"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'email is required'
        })
            .nonempty()
            .trim()
            .toLowerCase()
            .min(3, { message: 'Must be 3 or more characters long' })
            .max(50, { message: 'Must be 50 or fewer characters long' })
            .email(),
        password: (0, zod_1.string)({
            required_error: 'password is required'
        })
            .nonempty()
            .min(6, { message: 'Must be 6 or more characters long' })
            .max(32, { message: 'Must be 32 or fewer characters long' })
    })
});
