"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateZod = void 0;
const zod_1 = require("zod");
const errorJson_1 = require("../helpers/errorJson");
const validateZod = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const errors = error.issues.map((issue) => ({
                error: issue.message,
                path: issue.path.join('/')
            }));
            return res.status(400).json((0, errorJson_1.errorJson)(errors));
        }
        return res.status(400).json((0, errorJson_1.errorJson)('Internal Server Error'));
    }
});
exports.validateZod = validateZod;
