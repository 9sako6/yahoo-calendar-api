"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.API_ENDPOINT = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const version_1 = require("./version");
exports.API_ENDPOINT = `/api/${version_1.API_VERSION}`;
exports.app = (0, express_1.default)();
// See http://expressjs.com/ja/4x/api.html#req.body
exports.app.use(express_1.default.json()); // for parsing application/json
exports.app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
exports.app.use(exports.API_ENDPOINT, router_1.router);
