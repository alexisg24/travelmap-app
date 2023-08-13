"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateInfo = void 0;
const paginateInfo = ({ resultArrayLength, startIndex, page, limit, maxPages }) => {
    const res = {};
    if (resultArrayLength >= limit && page < maxPages)
        res.next = { page: page + 1, limit };
    if (startIndex > 0)
        res.previous = { page: page - 1, limit };
    return res;
};
exports.paginateInfo = paginateInfo;
