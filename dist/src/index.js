"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = require("./routes/index.routes");
const docs_routes_1 = require("./routes/docs/docs.routes");
const errorJson_1 = require("./helpers/errorJson");
dotenv_1.default.config();
const server = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
server.disable('x-powered-by');
server.use((0, cors_1.default)());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use(express_1.default.static('public'));
server.use('/api/v1', index_routes_1.router);
(0, docs_routes_1.swaggerDocs)(server, PORT);
server.use('*', (_, res) => res.status(404).json((0, errorJson_1.errorJson)('Route not found')));
if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
exports.default = server;
