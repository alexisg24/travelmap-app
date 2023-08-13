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
exports.registerUser = void 0;
const encrypt_1 = require("../../utils/encrypt");
const middlewares_1 = require("../../middlewares");
const prismaInstance_1 = require("../../db/prismaInstance");
const errorJson_1 = require("../../helpers/errorJson");
const utils_1 = require("../../utils");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.checkUser !== null)
        return res.status(400).json((0, errorJson_1.errorJson)('Email is already in use'));
    const { name, lastname, username, email, password } = req.body;
    try {
        const newPassword = yield (0, encrypt_1.encryptPassword)(password);
        const { id } = yield prismaInstance_1.prisma.user.create({
            data: { name, lastname, username, email, password: newPassword }
        });
        const userJWT = yield (0, utils_1.generateJWT)({ id, username });
        return res.status(201).json({ ok: true, accessToken: userJWT });
    }
    catch (error) {
        return (0, middlewares_1.serverErrorsHandler)(error, req, res);
    }
});
exports.registerUser = registerUser;
