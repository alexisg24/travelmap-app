"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationMiddleware = void 0;
const paginationMiddleware = (req, res, next) => {
    var _a, _b;
    const page = parseInt((_a = req.query.page) !== null && _a !== void 0 ? _a : 1);
    const limit = parseInt((_b = req.query.limit) !== null && _b !== void 0 ? _b : 10);
    const startIndex = (page - 1) * limit;
    res.paginatedValues = {
        startIndex,
        limit,
        page
    };
    next();
};
exports.paginationMiddleware = paginationMiddleware;
