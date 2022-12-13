"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleRequest = void 0;
const consoleRequest = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
};
exports.consoleRequest = consoleRequest;
