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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWTMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorJson_1 = require("../helpers/errorJson");
const validateJWTMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-access-token');
    if (token === undefined || token === null) {
        return res.status(401).json((0, errorJson_1.errorJson)('Header: x-access-token is required'));
    }
    try {
        const { id, username } = jsonwebtoken_1.default.verify(token, process.env.JWT_USER_SECRET);
        req.authUser = { id, username };
    }
    catch (error) {
        return res.status(401).json((0, errorJson_1.errorJson)('Invalid token'));
    }
    return next();
});
exports.validateJWTMiddleware = validateJWTMiddleware;
