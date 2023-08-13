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
exports.refreshToken = void 0;
const generateJWT_1 = require("../../utils/generateJWT");
const middlewares_1 = require("../../middlewares");
const errorJson_1 = require("../../helpers/errorJson");
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.authUser == null)
            return res.status(400).json((0, errorJson_1.errorJson)('User not found'));
        const { id, username } = req.authUser;
        const userJWT = yield (0, generateJWT_1.generateJWT)({ id, username });
        return res.status(200).send({ ok: true, accessToken: userJWT });
    }
    catch (error) {
        return (0, middlewares_1.serverErrorsHandler)(error, req, res);
    }
});
exports.refreshToken = refreshToken;
