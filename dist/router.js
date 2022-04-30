"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
const utils_1 = require("./utils");
exports.router = (0, express_1.Router)();
exports.router.use((req, _res, next) => {
  (0, utils_1.requestLog)(req);
  next();
});
exports.router.get("/", controllers_1.root);
exports.router.post("/events/export", controllers_1.exportEvents);
