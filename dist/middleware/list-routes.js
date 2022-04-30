"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRoutes = void 0;
const router_1 = require("../router");
const listRoutes = (router) =>
  router.stack.map((layer) => {
    var _a;
    return (_a = layer.route) === null || _a === void 0 ? void 0 : _a.path;
  }).filter((path) => typeof path === "string");
exports.listRoutes = listRoutes;
console.log((0, exports.listRoutes)(router_1.router));
