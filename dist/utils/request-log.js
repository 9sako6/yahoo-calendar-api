"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLog = void 0;
const requestLog = (req) => {
  console.log(`Path: ${req.url}, Time: ${new Date()}`);
};
exports.requestLog = requestLog;
