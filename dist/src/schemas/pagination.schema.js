"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = void 0;
const zod_1 = require("zod");
exports.paginationSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        page: zod_1.coerce.number({ invalid_type_error: 'Page must be a number greater than 0' }).positive().default(1).optional(),
        limit: zod_1.coerce.number({ invalid_type_error: 'Limit must be a number greater than 0' }).positive().default(1).optional()
    })
});
