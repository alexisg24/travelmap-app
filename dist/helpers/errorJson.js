"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorJson = void 0;
const errorJson = (message) => {
    if (typeof message === 'string' || message instanceof String)
        return { ok: false, message: [{ error: message }] };
    return { ok: false, message };
};
exports.errorJson = errorJson;
