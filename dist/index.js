"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const node_http_1 = __importDefault(require("node:http"));
const constants_1 = require("./constants");
const controller_1 = require("./users/controller");
const Stringify_1 = __importDefault(require("./utils/Stringify"));
const { PORT } = process.env;
const { OK } = constants_1.ResponseMessage;
exports.httpServer = node_http_1.default
    .createServer((req, res) => {
    const { url } = req;
    if (url?.startsWith(`/api/${"users" /* Endpoints.USERS */}`)) {
        (0, controller_1.UserController)(req, res);
    }
    else {
        res.writeHead(OK.code, constants_1.ResponseContentType);
        res.end((0, Stringify_1.default)({ message: "No such endpoint found" }));
    }
})
    .listen(5000)
    .on("listening", () => {
    console.log("Server start listening on " + PORT);
});
