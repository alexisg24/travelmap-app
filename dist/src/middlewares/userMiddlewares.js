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
exports.verifyIfUsernameExist = exports.verifyIfUserExist = void 0;
const serverErrorsHandler_1 = require("./serverErrorsHandler");
const prismaInstance_1 = require("../db/prismaInstance");
const errorJson_1 = require("../helpers/errorJson");
const verifyIfUserExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const findUser = yield prismaInstance_1.prisma.user.findUnique({ where: { email } });
        req.checkUser = findUser;
    }
    catch (error) {
        (0, serverErrorsHandler_1.serverErrorsHandler)(error, req, res);
    }
    next();
});
exports.verifyIfUserExist = verifyIfUserExist;
const verifyIfUsernameExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.checkUser != null)
        return next();
    const { username } = req.body;
    try {
        const findUser = yield prismaInstance_1.prisma.user.findUnique({ where: { username } });
        if (findUser != null)
            return res.status(400).json((0, errorJson_1.errorJson)('username is already taken'));
    }
    catch (error) {
        (0, serverErrorsHandler_1.serverErrorsHandler)(error, req, res);
    }
    return next();
});
exports.verifyIfUsernameExist = verifyIfUsernameExist;
