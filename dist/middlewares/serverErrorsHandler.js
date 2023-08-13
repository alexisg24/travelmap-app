"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverErrorsHandler = void 0;
const errorJson_1 = require("../helpers/errorJson");
const serverErrorsHandler = (err, _req, res) => {
    console.log(err);
    return res.status(500).json((0, errorJson_1.errorJson)('Internal Server Error'));
};
exports.serverErrorsHandler = serverErrorsHandler;
